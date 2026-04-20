import { useItems } from "../useItems";
import { ItemProps, compareItemsByOrder } from "../../../Types/types";

export const useBooks = () => {
  const { data, isLoading } = useItems("Hobbies");
  const books: ItemProps[] = (data ?? [])
    .filter((item: ItemProps) => item.subtype === "Books")
    .sort(compareItemsByOrder);
  return { books, isLoading };
};
