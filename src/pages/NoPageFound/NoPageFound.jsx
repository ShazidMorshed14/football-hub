import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import NoDataPlaceholder from "../../components/global/NoDataPlaceholder";

const NoPageFound = () => {
  return (
    <div>
      <Paper
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <NoDataPlaceholder serverError={false} />
        <Typography variant="h4">Route not valid</Typography>
      </Paper>
    </div>
  );
};

export default NoPageFound;
