import { useEffect, useState } from "react";
import {
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./services/transactionsService";
import { Modal } from "./components/Modal";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { Button } from "./components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatCurrency } from "./utils/formatCurrency";
import {
  TransactionRequest,
  TransactionResponse,
  TransactionType,
} from "./models/transactions";
import { AccountResponse } from "./models/account";
import { toast, Toaster } from "sonner";
import { Piechart } from "./components/Piechart";
import { FaPaperclip } from "react-icons/fa6";

interface AppProps {
  account: AccountResponse;
}

function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", { month: "long" });
}

function getTransactionName(transaction: string | undefined) {
  if (!transaction) return "";

  const transactionMap = new Map([
    ["Debit", "Débito"],
    ["Credit", "Crédito"],
  ]);
  return transactionMap.get(transaction);
}

function App({ account }: AppProps | any) {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    async function handleGetTransactions() {
      if (!account?.id) return;

      try {
        const transactions = await getTransactions(token as string, account.id);
        setTransactions(transactions);
      } catch (error) {
        toast.error("Falha ao buscar transações.");
      } finally {
        setLoading(false);
      }
    }

    handleGetTransactions();
  }, [account?.id, token]);

  const openEditModal = (transaction: TransactionResponse) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = async (transaction: TransactionResponse) => {
    setEditingTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTransaction = async (transaction: TransactionResponse) => {
    setLoading(true);
    try {
      await deleteTransaction(token as string, account.id, transaction.id);
      setTransactions(transactions.filter((t) => t.id !== transaction.id));
      toast.success("Transação excluída com sucesso!");
      setEditingTransaction(null);
    } catch (error) {
      toast.error("Falha ao excluir transação.");
    } finally {
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const handleUpdateTransaction = async (transaction: TransactionRequest) => {
    setLoading(true);
    try {
      const payload = {
        type: transaction.type,
        value: transaction.value,
        accountId: account.id,
        anexo: transaction.anexo,
      };

      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction?.id ? { ...t, ...payload } : t
        )
      );

      await updateTransaction(
        token as string,
        editingTransaction?.id as string,
        payload
      );
      toast.success("Transação atualizada com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar transação.");
    } finally {
      setEditingTransaction(null);
      setIsEditModalOpen(false);
      setLoading(false);
    }
  };

  const downloadAttachment = (transaction: TransactionResponse) => {
    const base64 = transaction.anexo;
    if (!base64) return null;

    const byteCharacters = atob(base64);
    const byteNumbers = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type: "image/png" });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `comprovante_${transaction.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  };

  return (
    <section className="flex flex-col lg:flex-row lg:max-h-[500px] gap-6 w-full max-w-7xl">
      <section className="flex flex-col bg-[#004D61] w-full rounded-lg p-10 md:p-6">
        <h2 className="text-white mb-6">Extrato</h2>
        {loading ? (
          <p className="text-gray-400">Carregando extrato...</p>
        ) : transactions && transactions.length === 0 ? (
          <p className="text-center text-background">
            Nenhuma transação cadastrada.
          </p>
        ) : (
          <ul className="overflow-y-auto bg-white  rounded-lg max-h-[630px] lg:max-h-[400px]">
            {transactions?.map((transaction: TransactionResponse) => (
              <li
                key={transaction.id}
                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 border-dashed border-b-2 border-[#47A138] rounded-lg p-3"
              >
                <span className="text-[#47A138] text-sm font-semibold capitalize">
                  {getMonthName(transaction.date.toString())}
                </span>
                <p className="flex justify-between items-center gap-4 capitalize">
                  {getTransactionName(transaction.type)}
                  <span className="text-gray-400 text-sm">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </span>
                </p>

                <p className="font-roboto-mono font-semibold break-all">
                  {["transfer", "expense"].includes(transaction.type) && "- "}
                  {formatCurrency(transaction.value)}
                </p>

                <div className="flex gap-4 text-lg ml-auto">
                  {transaction.anexo && transaction.anexo.length && (
                    <p
                      className="flex items-center gap-1 font-roboto-mono text-sm underline-offset-2 transition-all hover:underline hover:text-green-500"
                      role="button"
                      onClick={() => downloadAttachment(transaction)}
                    >
                      <FaPaperclip />
                      anexo
                    </p>
                  )}
                  <FaEdit
                    className="text-green-500 transition hover:text-green-400"
                    title="Editar"
                    role="button"
                    onClick={() => openEditModal(transaction)}
                  />
                  <FaTrash
                    className="text-red-500 transition hover:text-red-400"
                    title="Deletar"
                    role="button"
                    onClick={() => openDeleteModal(transaction)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Piechart transactions={transactions} loading={loading} />

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editingTransaction && (
          <AddTransactionForm
            loading={loading}
            transactionId={editingTransaction.id}
            initialType={editingTransaction.type as TransactionType}
            initialAmount={editingTransaction.value}
            initialFile={editingTransaction.anexo}
            title="Editar Transação"
            buttonText="Salvar Alterações"
            onSubmit={(transaction) =>
              handleUpdateTransaction({
                type: transaction.type,
                accountId: account.id,
                value: transaction.amount,
                anexo: transaction.anexo,
              })
            }
          />
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        {editingTransaction && (
          <>
            <h2 className="mb-8">Deletar Transação</h2>
            <p className="rounded-md p-1 mb-8">
              Esta ação irá excluir definitivamente a transação de{" "}
              <span className="font-semibold capitalize">
                {getTransactionName(editingTransaction.type)}
              </span>{" "}
              de{" "}
              <span className="font-semibold">
                {formatCurrency(editingTransaction.value)}
              </span>
              . Gostaria de continuar mesmo assim?
            </p>

            <div className="flex justify-between">
              <Button
                variant="tertiary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDeleteTransaction(editingTransaction)}
                disabled={loading}
              >
                {loading ? "Aguarde" : "Deletar"}
              </Button>
            </div>
          </>
        )}
      </Modal>
      <Toaster position="top-right" richColors closeButton />
    </section>
  );
}

export default App;
