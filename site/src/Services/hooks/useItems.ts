import { useQuery } from "react-query";

export const useItems = (type:string) =>{
  const { isLoading, isFetching, data } = useQuery(type, () =>
    fetch(`${process.env.REACT_APP_API_BASE_URL}/Items/${type}`).then((res) => res.json())
  );
  return {isLoading, isFetching, data}
}