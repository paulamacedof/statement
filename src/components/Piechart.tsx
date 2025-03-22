import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TransactionResponse } from "@/models/transactions";

interface Props {
  transactions: TransactionResponse[];
  loading: boolean;
}

export function Piechart({ transactions, loading }: Props) {
  const groupedData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.value < 0) {
        acc.debit += transaction.value; // Add negative values to debit
      } else {
        acc.credit += transaction.value; // Add positive values to credit
      }
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  return (
    <section className="bg-white rounded-lg p-6 lg:min-w-[300px]">
      <h2 className="font-bold pb-6">Dashboard</h2>
      <p className="font-semibold text-[#84cc16]">Valor total em R$</p>
      <div className="mx-auto">
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: Math.abs(groupedData.debit),
                  label: loading ? "..." : `Débito (R$ ${groupedData.debit})`,
                },
                {
                  id: 1,
                  value: groupedData.credit,
                  label: loading ? "..." : `Crédito (R$ ${groupedData.credit})`,
                },
              ],
              highlightScope: { fade: "global", highlight: "item" },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              cx: 100,
              cy: 200,
            },
          ]}
          slotProps={{
            legend: {
              position: { horizontal: "left", vertical: "top" },
            },
          }}
          height={340}
          loading={loading}
        />
      </div>
    </section>
  );
}
