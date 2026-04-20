import { useQuery } from "react-query";
import { ItemProps } from "../../../Types/types";

export const useCurrentGame = () => {
  const { data, isLoading } = useQuery<ItemProps | null>(
    "currentGame",
    () =>
      fetch(`${process.env.REACT_APP_API_BASE_URL}/videogames/current`).then((res) =>
        res.json()
      )
  );
  return { currentGame: data ?? null, isLoading };
};
