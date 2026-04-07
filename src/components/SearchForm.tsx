import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { CITIES, CAR_TYPES } from "../data/mockData";
import type { SearchParams } from "../utils/types";

interface Props {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getNextWeek() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export function SearchForm({ onSearch, loading }: Props) {
  const [city, setCity] = useState("Helsinki");
  const [pickupDate, setPickupDate] = useState(getToday);
  const [returnDate, setReturnDate] = useState(getNextWeek);
  const [carType, setCarType] = useState("All");

  const handleSubmit = () => {
    onSearch({ city, pickupDate, returnDate, carType });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Pickup City</InputLabel>
        <Select
          value={city}
          label="Pickup City"
          onChange={(e) => setCity(e.target.value)}
        >
          {CITIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Pickup Date"
        type="date"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getToday() }}
      />

      <TextField
        label="Return Date"
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: pickupDate }}
      />

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Car Type</InputLabel>
        <Select
          value={carType}
          label="Car Type"
          onChange={(e) => setCarType(e.target.value)}
        >
          {CAR_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <SearchIcon />
          )
        }
        sx={{ height: 56, px: 4, fontWeight: 700 }}
      >
        {loading ? "Searching…" : "Search"}
      </Button>
    </Box>
  );
}
