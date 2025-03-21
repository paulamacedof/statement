import { TransactionResponse } from "@/models/transactions";
import api from "./axios";

export const getTransactions = async (
  token: string,
  accountId: string
): Promise<TransactionResponse[]> => {
  try {
    const request = await api.get(`account/${accountId}/statement`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data.data.transactions;
  } catch (error) {
    console.error("Error getting statement:", error);
    throw error;
  }
};
