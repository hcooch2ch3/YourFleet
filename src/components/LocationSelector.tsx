import React, { useState } from "react";
import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";

interface Location {
  id: string;
  name: string;
  count?: number;
  starred?: boolean;
}

const locations: Location[] = [
  { id: "all", name: "All Locations" },
  { id: "starred", name: "Starred", count: 5, starred: true },
  { id: "group1", name: "Group 1", count: 10 },
  { id: "group2", name: "Group 2", count: 2 },
  { id: "group3", name: "Group 3", count: 4 },
];

export default function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <Select
        value={selectedLocation}
        onChange={handleSelectChange}
        displayEmpty
        fullWidth
        renderValue={(value) => {
          const selected = locations.find((loc) => loc.id === value);
          return selected ? selected.name : "Select Location";
        }}
        sx={{ minWidth: 200 }}
      >
        <MenuItem disabled>
          <TextField
            placeholder="Search Group"
            value={searchText}
            onChange={handleSearchChange}
            variant="standard"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </MenuItem>
        {filteredLocations.map((location) => (
          <MenuItem key={location.id} value={location.id}>
            <ListItemIcon>
              {location.starred && <StarIcon style={{ color: "gold" }} />}
            </ListItemIcon>
            <ListItemText primary={location.name} />
            {location.count && (
              <span style={{ marginLeft: "auto" }}>({location.count})</span>
            )}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
