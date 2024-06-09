import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  GetCategorywisePlayers,
  GetCategorywisePlayersDummy,
} from "../../services/players";
import { Box, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import AnimatedLoader from "../global/AnimatedLoader";
import { isArrayAndHasContent } from "../../utils/utils";
import NoDataPlaceholder from "../global/NoDataPlaceholder";
import SmallDescCard from "../cards/SmallDescCard";
import { useInView } from "react-intersection-observer";
import InfiniteScroll from "react-infinite-scroll-component";
import TodoCard from "../global/TodoCard";

const CategorywisePlayers = ({
  type,
  expectedType,
  countryIds,
  clubIds,
  marketValue,
  age,
  addPlayerToTeam,
  createTeamEnable = false,
}) => {
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      "categorywise-players",
      type,
      countryIds,
      clubIds,
      marketValue,
      age,
    ],
    queryFn: ({ pageParam = 1 }) =>
      GetCategorywisePlayers({
        pageParam: pageParam,
        position_group: type == "ALL" ? null : type,
        country_ids: countryIds,
        club_ids: clubIds,
        market_value_max: marketValue,
        age_max: age,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
    enabled: type === expectedType,
    onError: (error) => {
      console.log(error);
    },
  });

  //console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      //console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  const content = data?.pages?.map((players) =>
    players.map((player, index) => {
      if (players.length === index + 1) {
        return (
          <Grid item xs={12} sm={12} md={4} lg={3} key={player.id}>
            <SmallDescCard
              innerRef={ref}
              key={players.id}
              player={players}
              category={type}
              createTeamEnable={createTeamEnable}
              addPlayerToTeam={addPlayerToTeam}
            />
          </Grid>
        );
      }
      return (
        <Grid item xs={12} sm={12} md={4} lg={3} key={player.id}>
          <SmallDescCard
            key={player.id}
            player={player}
            category={type}
            createTeamEnable={createTeamEnable}
            addPlayerToTeam={addPlayerToTeam}
          />
        </Grid>
      );
    })
  );

  console.log(data);

  return (
    <div style={{ minHeight: "200vh" }}>
      {/* {type} */}
      {isArrayAndHasContent(data?.pages) ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
            {content}
            {!isFetchingNextPage && (
              <Grid item xs={12} sm={12} md={4} lg={3} key={"loader"}>
                <Skeleton variant="rectangular" width={300} height={450} />
              </Grid>
            )}
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
