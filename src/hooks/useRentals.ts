import { useState, useCallback } from "react";
import type { CarRental, PriceTrend, SearchParams } from "../utils/types";

interface RentalState {
  rentals: CarRental[];
  priceTrends: PriceTrend[];
  loading: boolean;
  error: string | null;
  searched: boolean;
}

export function useRentals() {
  const [state, setState] = useState<RentalState>({
    rentals: [],
    priceTrends: [],
    loading: false,
    error: null,
    searched: false,
  });

  const search = useCallback(async (params: SearchParams) => {
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const [rentalsRes, trendsRes] = await Promise.all([
        fetch(`/api/rentals?city=${params.city}&carType=${params.carType}`),
        fetch(
          `/api/price-trends?city=${params.city}&carType=${params.carType}`
        ),
      ]);

      const rentalsJson = await rentalsRes.json();
      const trendsJson = await trendsRes.json();

      setState({
        rentals: rentalsJson.data,
        priceTrends: trendsJson.data,
        loading: false,
        error: null,
        searched: true,
      });
    } catch {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Failed to fetch rentals. Please try again.",
      }));
    }
  }, []);

  return { ...state, search };
}
