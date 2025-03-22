export type TransactionType = "deposit" | "transfer" | "expense";

export interface TransactionResponse {
  id: string;
  type: TransactionType;
  value: number;
  date: Date;
  accountId: string;
}

export interface TransactionRequest {
  accountId: string;
  type: TransactionType;
  value: number;
}
