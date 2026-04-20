import { useState } from "react";
import { useQueryClient } from "react-query";

const TOKEN_KEY = "dashboard_token";

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const deleteGame = async (id: string) => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN_KEY);
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/videogames/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      queryClient.invalidateQueries("Hobbies");
      queryClient.invalidateQueries("currentGame");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteGame, isLoading };
};
