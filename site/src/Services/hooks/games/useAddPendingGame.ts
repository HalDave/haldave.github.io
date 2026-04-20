import { useState } from "react";
import { useQueryClient } from "react-query";
import { GameSearchResult } from "../../../Types/types";

const TOKEN_KEY = "dashboard_token";

export const useAddPendingGame = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addPendingGame = async (game: GameSearchResult) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const token = sessionStorage.getItem(TOKEN_KEY);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/videogames/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameId: game.gameId,
            title: game.title,
            developer: game.developer,
            image: game.thumbnail ?? "",
            status: "Pending",
          }),
        }
      );
      if (!res.ok) {
        setError("Failed to save game");
      } else {
        setSuccess(true);
        queryClient.invalidateQueries("Hobbies");
      }
    } catch {
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return { addPendingGame, isLoading, error, success };
};
