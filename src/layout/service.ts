import { AxiosInstance } from "@/shared/configs/api";
import { useQuery } from "react-query";

export const useGetMenu = () => {
  const { data } = useQuery(
    ["menus"],
    async () => {
      const { data } = await AxiosInstance.get<{ menus: Menu[] }>("/menus");
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return { menu: data };
};
