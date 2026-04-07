import { useState } from "react";
import { Alert, Box, Container, Divider, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { SearchForm } from "./components/SearchForm";
import { RentalsTable } from "./components/RentalsTable";
import { PriceTrendChart } from "./components/PriceTrendChart";
import { ProviderBarChart } from "./components/ProviderBarChart";
import { StatsCards } from "./components/StatsCards";
import { useRentals } from "./hooks/useRentals";
import type { SearchParams } from "./utils/types";

export default function App() {
  const { rentals, priceTrends, loading, error, searched, search } =
    useRentals();
  const [lastParams, setLastParams] = useState<SearchParams | null>(null);

  const handleSearch = (params: SearchParams) => {
    setLastParams(params);
    search(params);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 3,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <DirectionsCarIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight={800} letterSpacing={-0.5}>
                Car Rental Dashboard
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Compare prices across providers in real-time
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {/* Search */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {/* Results */}
        {searched && !loading && rentals.length > 0 && lastParams && (
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            <StatsCards rentals={rentals} city={lastParams.city} />
            <Divider />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 3,
              }}
            >
              <ProviderBarChart rentals={rentals} />
              <PriceTrendChart
                data={priceTrends}
                carType={lastParams.carType}
              />
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                All Cars
              </Typography>
              <RentalsTable rows={rentals} />
            </Box>
          </Box>
        )}

        {/* Empty state */}
        {!searched && !loading && (
          <Box sx={{ textAlign: "center", mt: 10, color: "text.secondary" }}>
            <DirectionsCarIcon sx={{ fontSize: 80, opacity: 0.15 }} />
            <Typography variant="h6" sx={{ mt: 2, opacity: 0.4 }}>
              Select a city, dates and car type — then hit Search
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
