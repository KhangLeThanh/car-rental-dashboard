import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PriceTrend } from "../utils/types";

interface Props {
  data: PriceTrend[];
  carType: string;
}

const PROVIDER_COLORS = {
  Hertz: "#d32f2f",
  Sixt: "#f57c00",
  Europcar: "#388e3c",
  Avis: "#1565c0",
  Budget: "#7b1fa2",
};

export function PriceTrendChart({ data, carType }: Props) {
  return (
    <Box
      sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 3 }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Price Trends — {carType} (Next 7 Days)
      </Typography>

      {carType === "All" ? (
        <Box
          sx={{
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            Select a specific car type to see price trends
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => `€${v}`}
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
            />
            <Tooltip formatter={(v: number) => [`€${v}`, ""]} />
            <Legend />
            {Object.entries(PROVIDER_COLORS).map(([provider, color]) => (
              <Line
                key={provider}
                type="monotone"
                dataKey={provider}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
