import { useItems } from "../useItems";
import { ItemProps, compareItemsByOrder } from "../../../Types/types";

export const useGames = () => {
  const { data, isLoading } = useItems("Hobbies");
  const games: ItemProps[] = (data ?? [])
    .filter((item: ItemProps) => item.subtype === "VideoGames")
    .sort(compareItemsByOrder);
  return { games, isLoading };
};
