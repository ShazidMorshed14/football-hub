import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import { Stack, TextField } from "@mui/material";
import useDebounce from "../../hook/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  SearchPlayerData,
  SearchPlayerDataDummy,
} from "../../services/players";
import AnimatedLoader from "./AnimatedLoader";
import NoDataPlaceholder from "./NoDataPlaceholder";

const SearchItemWrapper = ({ handleCloseUserMenu }) => {
  const [search, setSearch] = useState(null);

  const debouncedSearchTerm = useDebounce(search, 1000);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) {
        return SearchPlayerData(debouncedSearchTerm);
      }
      return { data: null };
    },
  });

  if (error) return <div>Server not responding</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search Player"
        variant="outlined"
        placeholder="Search player..."
        fullWidth
        size="sm"
        color="warning"
        value={search == null ? "" : search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <AnimatedLoader />}
      {data?.data && data?.data !== null && (
        <SearchDropDown
          list={data?.data?.players}
          handleCloseUserMenu={handleCloseUserMenu}
        />
      )}
    </div>
  );
};

export default SearchItemWrapper;
