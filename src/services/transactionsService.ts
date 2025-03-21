import { TransactionRequest, TransactionResponse } from "@/models/transactions";
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

export const deleteTransaction = async (
  token: string,
  accountId: string,
  transactionId: string
) => {
  try {
    await api.delete(`account/transaction`, {
      params: {
        accountId,
        transactionId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (
  token: string,
  transationId: string,
  payload: TransactionRequest
) => {
  try {
    await api.put(`account/transaction/${transationId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};
