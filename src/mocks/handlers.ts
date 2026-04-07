import { http, HttpResponse } from "msw";
import { generateRentals, generatePriceTrends } from "../data/mockData";

export const handlers = [
  http.get("/api/rentals", ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get("city") ?? "Helsinki";
    const carType = url.searchParams.get("carType") ?? "All";
    const rentals = generateRentals(city, carType);
    return HttpResponse.json({ data: rentals });
  }),

  http.get("/api/price-trends", ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get("city") ?? "Helsinki";
    const carType = url.searchParams.get("carType") ?? "Economy";
    const trends = generatePriceTrends(city, carType);
    return HttpResponse.json({ data: trends });
  }),
];
