# Car Rental Dashboard

A responsive car rental comparison dashboard built with React, TypeScript, Vite, and Material UI. Users can search for available cars by city, date range, and car type — then compare prices across providers through charts and a sortable table.

---

## Tech Stack

| Tech                      | Purpose                        |
| ------------------------- | ------------------------------ |
| React 18                  | UI framework                   |
| TypeScript                | Type safety                    |
| Vite                      | Build tool and dev server      |
| Material UI (MUI)         | Component library and styling  |
| Recharts                  | Charts (line chart, bar chart) |
| MSW (Mock Service Worker) | Mock API for development       |

---

## Features

- Search by city, pickup date, return date, and car type
- Summary stat cards (total results, available cars, avg price, best deal)
- Grouped bar chart — average price per provider and car type
- Line chart — 7-day price trend per provider (shown only when a specific car type is selected)
- Sortable, paginated table with provider chips, star ratings, and availability badges
- City-based dynamic pricing (Oslo and Zurich are more expensive than Madrid and Rome)
- Fully works offline — no real API needed

---

## Project Structure

```
src/
├── utils/
│   └── types.ts              # TypeScript interfaces
├── data/
│   └── mockData.ts           # Mock data generator with city pricing
├── mocks/
│   ├── handlers.ts           # MSW API route handlers
│   └── browser.ts            # MSW browser worker setup
├── hooks/
│   └── useRentals.ts         # Data fetching hook
├── components/
│   ├── SearchForm.tsx         # Search inputs
│   ├── StatsCards.tsx         # Summary cards
│   ├── ProviderBarChart.tsx   # Grouped bar chart
│   ├── PriceTrendChart.tsx    # 7-day line chart
│   └── RentalsTable.tsx       # Sortable MUI table
├── App.tsx                    # Main layout
└── main.tsx                   # Entry point with MSW + MUI theme
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Initialize MSW service worker

```bash
npx msw init public/ --save
```

> This creates a `mockServiceWorker.js` file in your `public/` folder. This step is required for MSW to work in the browser.

### 3. Start the dev server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## Mock API Endpoints

MSW intercepts these routes — no real backend needed:

| Method | Endpoint            | Description                                        |
| ------ | ------------------- | -------------------------------------------------- |
| GET    | `/api/rentals`      | Returns car listings filtered by city and car type |
| GET    | `/api/price-trends` | Returns 7-day price trend data per provider        |

### Query Parameters

**`/api/rentals`**

| Param     | Type   | Example        |
| --------- | ------ | -------------- |
| `city`    | string | `Helsinki`     |
| `carType` | string | `SUV` or `All` |

**`/api/price-trends`**

| Param     | Type   | Example           |
| --------- | ------ | ----------------- |
| `city`    | string | `Helsinki`        |
| `carType` | string | `SUV` (not `All`) |

> When `carType` is `All`, the price trend chart is hidden and a message is shown instead.

---

## City Pricing Multipliers

Prices vary realistically by city:

| City       | Multiplier   |
| ---------- | ------------ |
| Zurich     | 1.30×        |
| London     | 1.25×        |
| Oslo       | 1.20×        |
| Paris      | 1.15×        |
| Copenhagen | 1.10×        |
| Amsterdam  | 1.10×        |
| Stockholm  | 1.05×        |
| Helsinki   | 1.00× (base) |
| Vienna     | 0.95×        |
| Berlin     | 0.90×        |
| Rome       | 0.88×        |
| Madrid     | 0.85×        |

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Install Commands

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled recharts msw
```

---

## Notes

- The price trend chart only appears when a **specific car type** is selected — selecting `All` shows a placeholder message instead
- Prices include a small random jitter (±12%) on every search to simulate real-world price fluctuation
- MSW runs only in development — in production, replace the mock handlers with real API calls in `useRentals.ts`
