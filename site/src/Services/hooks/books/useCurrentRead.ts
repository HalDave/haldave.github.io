import { useQuery } from "react-query";
import { ItemProps } from "../../../Types/types";

export const useCurrentRead = () => {
  const { data, isLoading } = useQuery<ItemProps | null>(
    "currentRead",
    () =>
      fetch(`${process.env.REACT_APP_API_BASE_URL}/books/current`).then((res) =>
        res.json()
      )
  );
  return { currentRead: data ?? null, isLoading };
};
