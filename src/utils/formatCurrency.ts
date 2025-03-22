export const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return;

  const value = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(amount);

  return value;
};
