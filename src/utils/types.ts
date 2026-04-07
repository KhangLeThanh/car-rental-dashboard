export interface CarRental {
  id: string;
  provider: "Hertz" | "Sixt" | "Europcar" | "Avis" | "Budget";
  carModel: string;
  carType: "Economy" | "Compact" | "SUV" | "Luxury" | "Van";
  transmission: "Automatic" | "Manual";
  seats: number;
  pricePerDay: number;
  currency: "EUR";
  available: boolean;
  rating: number;
  location: string;
}

export interface SearchParams {
  city: string;
  pickupDate: string;
  returnDate: string;
  carType: string;
}

export interface PriceTrend {
  date: string;
  Hertz: number;
  Sixt: number;
  Europcar: number;
  Avis: number;
  Budget: number;
}
