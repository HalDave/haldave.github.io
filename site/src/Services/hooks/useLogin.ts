import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (password: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      if (!res.ok) {
        setError("Invalid password");
        return null;
      }
      const { token } = await res.json();
      return token as string;
    } catch {
      setError("Connection error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
