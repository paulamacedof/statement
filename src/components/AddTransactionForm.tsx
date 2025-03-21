import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "./Button";
import { TransactionType } from "@/models/transactions";

interface AddTransactionFormProps {
  initialType?: TransactionType | "";
  initialAmount?: number;
  initialDate?: string;
  onSubmit: (transaction: {
    type: TransactionType;
    amount: number;
    date: string;
  }) => void;
  title?: string;
  buttonText?: string;
}

export function AddTransactionForm({
  initialType = "",
  initialAmount = 0,
  initialDate = new Date().toISOString().split("T")[0],
  onSubmit,
  title = "Adicionar Nova Transação",
  buttonText = "Criar Transação",
}: AddTransactionFormProps) {
  const [type, setType] = useState<TransactionType | "">(initialType);
  const [amount, setAmount] = useState<string>(initialAmount.toString());
  const [date, setDate] = useState<string>(initialDate);
  const isDisabled = parseFloat(amount) <= 0 || type === "";

  const handleSubmit = () => {
    onSubmit({
      type: type as TransactionType,
      amount: parseFloat(amount),
      date,
    });
  };

  useEffect(() => {
    setType(initialType);
    setAmount(initialAmount.toString());
    setDate(initialDate);
  }, [initialType, initialAmount, initialDate]);

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
          <option value="Debit">Despesa</option>
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

        <div className="mb-4">
          <label htmlFor="date" className="block mb-1">
            Data
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 border border-[#004D61] rounded-lg"
          />
        </div>

        <Button
          variant="secondary"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {buttonText}
        </Button>
      </form>
    </>
  );
}
