export type StatementType = "Debit" | "Credit";

export interface StatementResponse {
  id: string;
  accountId: string;
  type: string;
  value: number;
  date: string;
}

export interface StatementRequest {
  accountId: string;
  type: StatementType;
  value: number;
}
