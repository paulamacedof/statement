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

interface AppProps {
  accountId: string;
}

function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", { month: "long" });
}

function getTransactionName(transaction: string | undefined) {
  if (!transaction) return "";

  const transactionMap = new Map([
    ["Debit", "débito"],
    ["Credit", "Crédito"],
  ]);
  return transactionMap.get(transaction);
}

function App({ accountId }: AppProps | any) {
  const token = localStorage.getItem("token");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    async function handleGetTransactions() {
      if (accountId) {
        const transactions = await getTransactions(token as string, accountId);

        setTransactions(transactions);
      }
    }

    handleGetTransactions();
  }, [accountId, token]);

  const openEditModal = (transaction: TransactionResponse) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = async (transaction: TransactionResponse) => {
    setEditingTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTransaction = async (transaction: TransactionResponse) => {
    await deleteTransaction(token as string, accountId, transaction.id);
    setTransactions(transactions.filter((t) => t.id !== transaction.id));
    setEditingTransaction(null);
    setIsDeleteModalOpen(false);
  };

  const handleUpdateTransaction = async (transaction: TransactionRequest) => {
    const payload = {
      type: transaction.type,
      value: transaction.value,
      accountId,
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
    setEditingTransaction(null);
    setIsEditModalOpen(false);
  };

  return (
    <section className="col-span-1 bg-[#004D61] rounded-lg p-6 w-full lg:max-h-[500px] lg:max-w-[670px]">
      <h2 className="text-white mb-6">Extrato</h2>

      {transactions.length === 0 ? (
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

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editingTransaction && (
          <AddTransactionForm
            initialType={editingTransaction.type as TransactionType}
            initialAmount={editingTransaction.value}
            title="Editar Transação"
            buttonText="Salvar Alterações"
            onSubmit={(transaction) =>
              handleUpdateTransaction({
                ...transaction,
                accountId,
                value: transaction.amount,
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
              >
                Deletar
              </Button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

export default App;
