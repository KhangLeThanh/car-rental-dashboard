import { useState } from "react";
import {
  Box,
  Chip,
  Rating,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import type { CarRental } from "../utils/types";

interface Props {
  rows: CarRental[];
}

const PROVIDER_COLORS: Record<
  string,
  "primary" | "secondary" | "success" | "warning" | "error"
> = {
  Hertz: "error",
  Sixt: "warning",
  Europcar: "success",
  Avis: "primary",
  Budget: "secondary",
};

type SortKey = keyof CarRental;
type Order = "asc" | "desc";

function sort(rows: CarRental[], key: SortKey, order: Order): CarRental[] {
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    const gt = av > bv ? 1 : -1;
    return order === "asc" ? gt : -gt;
  });
}

export function RentalsTable({ rows }: Props) {
  const [orderBy, setOrderBy] = useState<SortKey>("pricePerDay");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (key: SortKey) => {
    if (orderBy === key) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
    setPage(0);
  };

  const sorted = sort(rows, orderBy, order);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const col = (
    key: SortKey,
    label: string,
    align?: "left" | "right" | "center"
  ) => (
    <TableCell
      align={align ?? "left"}
      sx={{ fontWeight: 700, bgcolor: "grey.100", whiteSpace: "nowrap" }}
    >
      <TableSortLabel
        active={orderBy === key}
        direction={orderBy === key ? order : "asc"}
        onClick={() => handleSort(key)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 1, overflow: "hidden" }}>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {col("provider", "Provider")}
              {col("carModel", "Car Model")}
              {col("carType", "Type")}
              {col("transmission", "Transmission")}
              {col("seats", "Seats", "center")}
              {col("pricePerDay", "Price / Day", "right")}
              {col("location", "Location")}
              {col("rating", "Rating")}
              {col("available", "Available")}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:last-child td": { border: 0 } }}
              >
                <TableCell>
                  <Chip
                    label={row.provider}
                    color={PROVIDER_COLORS[row.provider] ?? "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.carModel}</TableCell>
                <TableCell>{row.carType}</TableCell>
                <TableCell>{row.transmission}</TableCell>
                <TableCell align="center">{row.seats}</TableCell>
                <TableCell align="right">
                  <Typography fontWeight={700} color="primary.main">
                    €{row.pricePerDay}
                  </Typography>
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Rating
                      value={row.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="caption">{row.rating}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.available ? "Available" : "Unavailable"}
                    color={row.available ? "success" : "default"}
                    size="small"
                    variant={row.available ? "filled" : "outlined"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
