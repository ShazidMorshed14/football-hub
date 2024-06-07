import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  GetCategorywisePlayers,
  GetCategorywisePlayersDummy,
} from "../../services/players";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import AnimatedLoader from "../global/AnimatedLoader";
import { isArrayAndHasContent } from "../../utils/utils";
import NoDataPlaceholder from "../global/NoDataPlaceholder";
import SmallDescCard from "../cards/SmallDescCard";

const CategorywisePlayers = ({ type, expectedType }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["categorywise-players", type],
    queryFn: () =>
      GetCategorywisePlayersDummy({
        locale: "ES",
        sort_by: "popular",
        page_number: page,
        page_size: 10,
        position_group: type == "ALL" ? null : type,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    enabled: type === expectedType,
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading)
    return (
      <div>
        <Stack
          sx={{ minHeight: "60vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedLoader />
          <div>Loading...</div>
        </Stack>
      </div>
    );

  if (error)
    return (
      <div>
        <Stack
          sx={{ minHeight: "60vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <NoDataPlaceholder serverError={true} />
        </Stack>
      </div>
    );

  console.log(data);
  return (
    <div>
      {/* {type} */}
      {isArrayAndHasContent(data) ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
            {data?.map((player, index) => {
              return (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <SmallDescCard player={player} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <>
          <NoDataPlaceholder />
        </>
      )}
    </div>
  );
};

export default CategorywisePlayers;
