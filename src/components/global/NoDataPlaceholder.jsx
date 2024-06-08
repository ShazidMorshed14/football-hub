import { Stack, Typography } from "@mui/material";
import React from "react";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const NoDataPlaceholder = ({ serverError }) => {
  return (
    <div>
      <Stack
        width="100%"
        height={390}
        alignItems="center"
        justifyContent="center"
        gap="10px"
      >
        <HourglassEmptyIcon
          sx={{
            color: "darkorange",
            fontSize: "40px",
          }}
        />
        <Typography fontSize="1.5rem" fontWeight={500}>
          {serverError ? "Something went wrong" : "No Data"}
        </Typography>
        <Typography fontSize="0.8rem" variant="body">
          {serverError
            ? "Server error occured at this moment"
            : "No data found at the moment"}
        </Typography>
      </Stack>
    </div>
  );
};

export default NoDataPlaceholder;
