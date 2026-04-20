import { useState } from "react";
import { useQueryClient } from "react-query";
import { BookStatus } from "../../Types/types";

const TOKEN_KEY = "dashboard_token";

export const useUpdateBookStatus = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (id: string, status: BookStatus, rating?: number, opinion?: string) => {
    setIsLoading(true);
    setError(null);
    const token = sessionStorage.getItem(TOKEN_KEY);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/books/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            ...(rating !== undefined && { rating }),
            ...(opinion && { opinion }),
          }),
        }
      );
      if (!res.ok) {
        setError("Failed to update status");
      } else {
        queryClient.invalidateQueries("currentRead");
        queryClient.invalidateQueries("Hobbies");
      }
    } catch {
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading, error };
};
