import { Box, Card, CardContent, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EuroIcon from "@mui/icons-material/Euro";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import type { CarRental } from "../utils/types";

interface Props {
  rentals: CarRental[];
  city: string;
}

export function StatsCards({ rentals, city }: Props) {
  const available = rentals.filter((r) => r.available);
  const avgPrice = available.length
    ? Math.round(
        available.reduce((s, r) => s + r.pricePerDay, 0) / available.length
      )
    : 0;
  const cheapest = available.length
    ? Math.min(...available.map((r) => r.pricePerDay))
    : 0;

  const cards = [
    {
      label: "Total Results",
      value: rentals.length,
      icon: <DirectionsCarIcon />,
      color: "#1565c0",
    },
    {
      label: "Available Cars",
      value: available.length,
      icon: <CheckCircleIcon />,
      color: "#388e3c",
    },
    {
      label: "Avg Price / Day",
      value: `€${avgPrice}`,
      icon: <EuroIcon />,
      color: "#f57c00",
    },
    {
      label: "Best Deal",
      value: `€${cheapest}/day`,
      icon: <StarIcon />,
      color: "#d32f2f",
    },
  ];

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Showing results for <strong>{city}</strong>
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Card key={card.label} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ color: card.color, fontSize: 36, display: "flex" }}>
                {card.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  {card.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.label}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
