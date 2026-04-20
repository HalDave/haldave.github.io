import { useState } from "react";
import { useQueryClient } from "react-query";

const TOKEN_KEY = "dashboard_token";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const deleteBook = async (id: string) => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN_KEY);
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      queryClient.invalidateQueries("Hobbies");
      queryClient.invalidateQueries("currentRead");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteBook, isLoading };
};
