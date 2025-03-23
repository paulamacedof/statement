import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "./Button";
import { TransactionType } from "@/models/transactions";
import { FaPaperclip } from "react-icons/fa6";
import { toast } from "sonner";

interface AddTransactionFormProps {
  loading: boolean;
  transactionId?: string;
  initialType?: TransactionType | "";
  initialAmount?: number;
  initialFile?: string;
  onSubmit: (transaction: {
    type: TransactionType;
    amount: number;
    anexo?: string;
  }) => void;
  title?: string;
  buttonText?: string;
}

export function AddTransactionForm({
  loading,
  transactionId,
  initialType = "",
  initialAmount = 0,
  initialFile = "",
  onSubmit,
  title = "Adicionar Nova Transação",
  buttonText = "Criar Transação",
}: AddTransactionFormProps) {
  const [type, setType] = useState<TransactionType | "">(initialType);
  const [amount, setAmount] = useState<string>(initialAmount.toString());
  const [base64, setBase64] = useState<string>(initialFile);

  const handleSubmit = () => {
    onSubmit({
      type: type as TransactionType,
      amount: parseFloat(amount),
      anexo: base64,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const MAX_SIZE_MB = 0.1;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        toast.error(
          `Não foi possível anexar seu arquivo. O tamanho do arquivo pode ultrapassar as limitações do servidor.`
        );
        setBase64(initialFile);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64(reader.result?.toString().split(",")[1] || "");
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setType(initialType);
    setAmount(initialAmount.toString());
  }, [initialType, initialAmount]);

  return (
    <>
      <h2 className="mb-8 ">{title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full p-4 border border-[#004D61] rounded-lg mb-8 appearance-none bg-select-arrow bg-no-repeat bg-right"
          title="Selecione o tipo de transação"
        >
          <option value="" defaultValue="" disabled>
            Selecione o tipo de transação
          </option>
          <option value="Debit">Débito</option>
          <option value="Credit">Crédito</option>
        </select>

        <div className="mb-8">
          <label htmlFor="amount" className="block mb-1">
            Valor
          </label>
          <NumericFormat
            id="amount"
            value={amount}
            onValueChange={(values) => setAmount(values.value)}
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            allowLeadingZeros={false}
            allowNegative={false}
            fixedDecimalScale
            className="w-full p-4 border border-[#004D61] rounded-lg"
            placeholder="R$ 0,00"
            required
          />
        </div>

        {base64 && base64.length && base64 === initialFile ? (
          <p className="flex items-center content-between gap-1 font-roboto-mono text-gray-500 text-sm underline-offset-2 mb-8">
            <FaPaperclip />
            {`comprovante_${transactionId?.substring(0, 7)}...`}
            <span
              className="text-xs ml-auto transition-all hover:underline hover:text-[#004d61]"
              role="button"
              onClick={() => setBase64("")}
            >
              Remover anexo?
            </span>
          </p>
        ) : (
          <div className="mb-8">
            <label htmlFor="amount" className="block mb-1">
              Anexo
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        )}

        <Button variant="secondary" disabled={loading} onClick={handleSubmit}>
          {loading ? "Aguarde..." : buttonText}
        </Button>
      </form>
    </>
  );
}
