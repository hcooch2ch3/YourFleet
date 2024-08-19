import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Location } from "../mocks/db";
import { LocationsResult } from "../mocks/handlers";
import LocationSelector from "./LocationSelector";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function YourFleet() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [starLocationIds, setStarLocationIds] = useState<number[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 6,
  });
  const columns: GridColDef[] = [
    {
      field: "checkboxWithStar",
      headerName: "",
      width: 60,
      sortable: false,
      renderHeader: () => null,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
          onClick={() => handleStarClick(params.row.id)}
        >
          {starLocationIds.includes(params.row.id) ? (
            <StarIcon style={{ color: "gold", marginLeft: "4px" }} />
          ) : (
            <StarIcon style={{ color: "gray", marginLeft: "4px" }} />
          )}
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Locations",
      width: 400,
      renderCell: (params) =>
        params.row.robot.is_online ? (
          <Button variant="contained" disableElevation fullWidth>
            {params.row.name} <KeyboardArrowRightIcon />
          </Button>
        ) : (
          <Button variant="contained" disableElevation disabled fullWidth>
            {params.row.name} <KeyboardArrowRightIcon />
          </Button>
        ),
    },
    {
      field: "robots",
      headerName: "Robots",
      width: 150,
      renderCell: (params) =>
        params.row.robot.id.length > 0 ? (
          <b>🟢 {params.row.robot.id}</b>
        ) : (
          <>
            ⚪ <a href="#">Add</a>
          </>
        ),
    },
  ];

  useEffect(() => {
    fetchLocations(paginationModel.page + 1, debouncedSearchQuery);
    fetchStarredLocationIds();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchLocations(paginationModel.page + 1, debouncedSearchQuery);
  }, [paginationModel, debouncedSearchQuery]);

  const fetchLocations = async (page: number, query: string) => {
    try {
      const response = await fetch(
        `/locations?page=${page}&location_name=${query}&robot_id=${query}`,
      );
      const data: LocationsResult = await response.json();
      setLocations(data.locations);
      setRowCount(data.total_count);
    } catch (error) {
      console.error(error);
      setTimeout(function () {
        fetchLocations(page, query);
      }, 1000);
    }
  };

  const fetchStarredLocationIds = async () => {
    try {
      const response = await fetch("/starred_location_ids");
      const data = await response.json();
      setStarLocationIds(data.starred_location_ids);
    } catch (error) {
      console.error(error);
      setTimeout(function () {
        fetchStarredLocationIds();
      }, 1000);
    }
  };

  const handleStarClick = async (locationId: number) => {
    try {
      const starred_location_ids = starLocationIds.includes(locationId)
        ? starLocationIds.filter((id) => id !== locationId)
        : [...starLocationIds, locationId];
      const response = await fetch("/starred_location_ids", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starred_location_ids: starred_location_ids,
        }),
      });
      fetchStarredLocationIds();
    } catch (error) {
      console.error(error);
      alert("Could not star an item due to unexpected error.");
    }
  };

  return (
    <div>
      <Container style={{ height: "100%", width: "100%" }}>
        <h1 style={{ textAlign: "left" }}>Your Fleet</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <LocationSelector />
          <TextField
            label="Search robot or location"
            variant="outlined"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            style={{ width: "300px" }}
          />
        </div>
        <DataGrid
          rows={locations}
          rowCount={rowCount}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[6]}
          checkboxSelection
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Container>
    </div>
  );
}
