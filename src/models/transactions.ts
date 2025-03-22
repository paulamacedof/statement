export type TransactionType = "Debit" | "Credit";

export interface TransactionResponse {
  id: string;
  type: TransactionType;
  value: number;
  date: Date;
  accountId: string;
  anexo?: string;
}

export interface TransactionRequest {
  accountId: string;
  type: TransactionType;
  value: number;
  anexo?: string;
}
