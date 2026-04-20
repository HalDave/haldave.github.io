import { useState } from "react";
import { BookSearchResult } from "../../Types/types";

const TOKEN_KEY = "dashboard_token";

export const useAddCurrentRead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addCurrentRead = async (book: BookSearchResult) => {
    if (!book.openLibraryId) {
      setError("Book has no Open Library ID and cannot be saved");
      return;
    }

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
            id: book.openLibraryId,
            title: book.title,
            image: book.thumbnail ?? "",
          }),
        }
      );
      if (!res.ok) {
        setError("Failed to save book");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return { addCurrentRead, isLoading, error, success };
};
