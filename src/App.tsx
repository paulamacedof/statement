import { useEffect, useState } from "react";
import { getStatement } from "./services/statementService";
import { StatementResponse, StatementType } from "./models/statement";
import { Modal } from "./components/Modal";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { Button } from "./components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatCurrency } from "./utils/formatCurrency";

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
  const [statements, setStatements] = useState<any[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<StatementResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function handleGetStatement() {
      // const statements = await getStatement(token as string, accountId);
      const statements = [
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
        {
          id: "67d807ddb428649f44d1f54b",
          accountId: "67d5cb96f273c147ae3b0269",
          type: "Debit",
          value: -200,
          date: "2025-03-17T11:30:37.701Z",
        },
      ];
      setStatements(statements);
    }

    handleGetStatement();
  }, [accountId]);

  const openEditModal = (transaction: StatementResponse) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };
  const openDeleteModal = (transaction: StatementResponse) => {
    setEditingTransaction(transaction);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <section className="col-span-1 bg-[#004D61] rounded-lg p-6 w-full lg:max-w-[670px]">
      <h2 className="text-white mb-6">Extrato</h2>

      {statements.length === 0 ? (
        <p className="text-center text-background">
          Nenhuma transação cadastrada.
        </p>
      ) : (
        <ul className="overflow-y-auto bg-white rounded-lg max-h-[630px] lg:max-h-[670px]">
          {statements?.map((statements) => (
            <li
              key={statements.id}
              className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 border-dashed border-b-2 border-[#47A138] rounded-lg p-3"
            >
              <span className="text-[#47A138] text-sm font-semibold capitalize">
                {getMonthName(statements.date.toString())}
              </span>
              <p className="flex justify-between items-center gap-4 capitalize">
                {getTransactionName(statements.type)}
                <span className="text-gray-400 text-sm">
                  {new Date(statements.date).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </span>
              </p>

              <p className="font-roboto-mono font-semibold break-all">
                {["transfer", "expense"].includes(statements.type) && "- "}
                {formatCurrency(statements.value)}
              </p>

              <div className="flex gap-4 text-lg ml-auto">
                <FaEdit
                  className="text-green-500 transition hover:text-green-400"
                  title="Editar"
                  role="button"
                  onClick={() => openEditModal(statements)}
                />
                <FaTrash
                  className="text-red-500 transition hover:text-red-400"
                  title="Deletar"
                  role="button"
                  onClick={() => openDeleteModal(statements)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        {editingTransaction && (
          <AddTransactionForm
            initialType={editingTransaction.type as StatementType}
            initialAmount={editingTransaction.value}
            initialDate={
              new Date(editingTransaction.date).toISOString().split("T")[0]
            }
            title="Editar Transação"
            buttonText="Salvar Alterações"
            onSubmit={(transaction) => {
              // transactionService.updateTransaction(
              //   editingTransaction.id,
              //   transaction.type,
              //   transaction.amount,
              //   new Date(transaction.date)
              // );
              // refreshData();
              // toast.success("Transação editada com sucesso!");
              // closeEditModal();
            }}
          />
        )}
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        {editingTransaction && (
          <>
            <h2 className="mb-8">Deletar Transação</h2>
            <p className="rounded-md p-1 mb-8">
              Esta ação irá excluir definitivamente a transação de{" "}
              <span className="font-semibold capitalize">
                {/* {getTransactionName(editingTransaction.type)} */}
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
                onClick={() => {
                  closeDeleteModal();
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // transactionService.deleteTransaction(editingTransaction.id);
                  // refreshData();
                  // toast.success("Transação excluída com sucesso!");
                  // closeDeleteModal();
                }}
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
