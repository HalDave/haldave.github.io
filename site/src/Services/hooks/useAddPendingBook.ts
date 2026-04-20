import { useState } from "react";
import { useQueryClient } from "react-query";
import { BookSearchResult } from "../../Types/types";

const TOKEN_KEY = "dashboard_token";

export const useAddPendingBook = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addPendingBook = async (book: BookSearchResult) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const token = sessionStorage.getItem(TOKEN_KEY);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/books/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            googleBooksId: book.googleBooksId,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            image: book.thumbnail ?? "",
            status: "Pending",
          }),
        }
      );
      if (!res.ok) {
        setError("Failed to save book");
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

  return { addPendingBook, isLoading, error, success };
};
