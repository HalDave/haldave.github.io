import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { BookSearchResult } from "../../Types/types";

export const useBookSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { isLoading, data } = useQuery<BookSearchResult[]>(
    ["bookSearch", debouncedQuery],
    () =>
      fetch(
        `${process.env.REACT_APP_API_BASE_URL}/books/search?query=${encodeURIComponent(debouncedQuery)}`
      ).then((res) => res.json()),
    { enabled: !!debouncedQuery }
  );

  return { data: data ?? [], isLoading: isLoading && !!debouncedQuery };
};
