import type { CarRental, PriceTrend } from "../utils/types";

export const CITIES = [
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Berlin",
  "Paris",
  "Amsterdam",
  "London",
  "Madrid",
  "Rome",
  "Vienna",
  "Zurich",
];

export const CAR_TYPES = ["All", "Economy", "Compact", "SUV", "Luxury", "Van"];

export const PROVIDERS = [
  "Hertz",
  "Sixt",
  "Europcar",
  "Avis",
  "Budget",
] as const;

const BASE_PRICES: Record<string, Record<string, number>> = {
  Economy: { Hertz: 38, Sixt: 35, Europcar: 40, Avis: 36, Budget: 32 },
  Compact: { Hertz: 52, Sixt: 49, Europcar: 54, Avis: 50, Budget: 45 },
  SUV: { Hertz: 85, Sixt: 80, Europcar: 88, Avis: 82, Budget: 76 },
  Luxury: { Hertz: 140, Sixt: 155, Europcar: 148, Avis: 145, Budget: 130 },
  Van: { Hertz: 95, Sixt: 90, Europcar: 98, Avis: 93, Budget: 88 },
};

const CAR_MODELS: Record<string, string[]> = {
  Economy: ["Toyota Yaris", "VW Polo", "Ford Fiesta", "Opel Corsa"],
  Compact: ["Toyota Corolla", "VW Golf", "Ford Focus", "Opel Astra"],
  SUV: ["Toyota RAV4", "VW Tiguan", "Ford Kuga", "BMW X3"],
  Luxury: ["BMW 5 Series", "Mercedes E-Class", "Audi A6", "Volvo S90"],
  Van: ["VW Transporter", "Ford Transit", "Mercedes Vito", "Opel Vivaro"],
};

// City multiplier — makes prices realistically different per city
const CITY_MULTIPLIER: Record<string, number> = {
  Helsinki: 1.0,
  Stockholm: 1.05,
  Oslo: 1.2,
  Copenhagen: 1.1,
  Berlin: 0.9,
  Paris: 1.15,
  Amsterdam: 1.1,
  London: 1.25,
  Madrid: 0.85,
  Rome: 0.88,
  Vienna: 0.95,
  Zurich: 1.3,
};

function jitter(base: number, pct = 0.12): number {
  return Math.round(base * (1 + (Math.random() * 2 - 1) * pct));
}

function applyCity(base: number, city: string): number {
  const multiplier = CITY_MULTIPLIER[city] ?? 1.0;
  return Math.round(base * multiplier);
}

export function generateRentals(city: string, carType: string): CarRental[] {
  const types =
    carType === "All"
      ? ["Economy", "Compact", "SUV", "Luxury", "Van"]
      : [carType];

  const results: CarRental[] = [];
  let id = 1;

  for (const type of types) {
    const models = CAR_MODELS[type];
    for (const provider of PROVIDERS) {
      const base = applyCity(BASE_PRICES[type][provider], city);
      results.push({
        id: `${city}-${type}-${provider}-${id++}`,
        provider,
        carModel: models[Math.floor(Math.random() * models.length)],
        carType: type as CarRental["carType"],
        transmission: Math.random() > 0.3 ? "Automatic" : "Manual",
        seats: type === "Van" ? 8 : 5,
        pricePerDay: jitter(base),
        currency: "EUR",
        available: Math.random() > 0.15,
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        location: `${city} Airport`,
      });
    }
  }

  return results;
}

export function generatePriceTrends(
  city: string,
  carType: string
): PriceTrend[] {
  if (carType === "All") return [];

  const trends: PriceTrend[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const label = date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
    const row: PriceTrend = { date: label } as PriceTrend;
    for (const p of PROVIDERS) {
      const base = applyCity(BASE_PRICES[carType][p], city);
      row[p] = jitter(base, 0.18);
    }
    trends.push(row);
  }

  return trends;
}
