import { StatementResponse } from "@/models/statement";
import api from "./axios";

export const getStatement = async (
  token: string,
  accountId: string
): Promise<StatementResponse[]> => {
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
