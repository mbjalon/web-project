import StatsApi from "@/api/statsApi.ts";
import { useQuery } from "@tanstack/react-query";

export const useTotalValue = () => {
  return useQuery({
    queryKey: ["totalValue"],
    queryFn: async () => {
      return await StatsApi.getTotalValue();
    },
  });
};

export const useTotalAmount = () => {
  return useQuery({
    queryKey: ["totalAmount"],
    queryFn: async () => {
      return await StatsApi.getTotalAmount();
    },
  });
};

export const useTotalCpacity = () => {
  return useQuery({
    queryKey: ["totalCapacity"],
    queryFn: async () => {
      return await StatsApi.getTotalCapacity();
    },
  });
};
