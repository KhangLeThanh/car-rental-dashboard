import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CarRental } from "../utils/types";
import { PROVIDERS } from "../data/mockData";

interface Props {
  rentals: CarRental[];
}

const CAR_TYPES = ["Economy", "Compact", "SUV", "Luxury", "Van"];
const TYPE_COLORS = ["#42a5f5", "#66bb6a", "#ffa726", "#ef5350", "#ab47bc"];

export function ProviderBarChart({ rentals }: Props) {
  const data = PROVIDERS.map((provider) => {
    const row: Record<string, string | number> = { provider };
    for (const type of CAR_TYPES) {
      const matches = rentals.filter(
        (r) => r.provider === provider && r.carType === type
      );
      if (matches.length > 0) {
        row[type] = Math.round(
          matches.reduce((sum, r) => sum + r.pricePerDay, 0) / matches.length
        );
      }
    }
    return row;
  });

  return (
    <Box
      sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 3 }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Avg Price by Provider & Car Type (€/day)
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="provider" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `€${v}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`€${v}`, ""]} />
          <Legend />
          {CAR_TYPES.map((type, i) => (
            <Bar
              key={type}
              dataKey={type}
              fill={TYPE_COLORS[i]}
              radius={[3, 3, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
