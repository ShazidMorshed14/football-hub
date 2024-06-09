import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  GetPlayerProfile,
  GetPlayerProfileDummy,
} from "../../services/players";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AnimatedLoader from "../../components/global/AnimatedLoader";
import NoDataPlaceholder from "../../components/global/NoDataPlaceholder";
import { isArrayAndHasContent } from "../../utils/utils";

const PlayerProfile = () => {
  const { id } = useParams();
  //console.log(id);

  const { data, isLoading, refetch, error, isFetching } = useQuery({
    queryKey: ["machine-details", id],
    queryFn: () => GetPlayerProfile(id),
    refetchOnWindowFocus: false,
    enabled: id ? true : false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      toast.error("something went wrong");
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

  //console.log(data);
  const { playerProfile } = data.data;
  const { performanceSeasons } = data.data;
  const { heroImages } = data.data;
  //console.log(playerProfile);
  //console.log(performanceSeasons);
  //console.log(heroImages);

  return (
    <div>
      <Container maxWidth="xl">
        <Box mt="15px">
          <Stack direction="column">
            {/* player images section*/}
            <>
              {isArrayAndHasContent(heroImages) ? (
                <Grid
                  container
                  spacing={{ xs: 0, md: 0 }}
                  columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                >
                  {heroImages?.slice(0, 4)?.map((image, index) => {
                    return (
                      <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                        <img src={image?.url} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      height: "100%",
                      minHeight: "20vh",
                    }}
                  >
                    <Typography>No Image Found</Typography>
                  </Paper>
                </Grid>
              )}
            </>
            {/* player images section end*/}

            {/* player profile section */}
            <Stack
              my={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={3}
            >
              <Avatar
                src={playerProfile?.playerImage}
                sx={{ height: "100px", width: "100px" }}
              />

              <Stack direction="column">
                <Typography variant="h4">
                  {playerProfile?.playerName || "N/A"}
                </Typography>
                <Typography variant="h8">
                  {playerProfile?.playerFullName || "N/A"}
                </Typography>
              </Stack>
            </Stack>

            <Container>
              <Stack direction="column" justifyContent="flex-end">
                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Name: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.playerName || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Full Name: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.playerFullName || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Birthplace: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.birthplace || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Date of Birth: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.dateOfBirth || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2} alignItems="center">
                  <Typography variant="h6">Birth Place: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.birthplaceCountry || "N/A"}
                  </Typography>
                  <img
                    src={playerProfile?.birthplaceCountryImage}
                    style={{ width: "auto", height: "25px" }}
                  />
                </Stack>

                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Age: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.age || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2}>
                  <Typography variant="h6">Height: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.height || "N/A"}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={2} alignItems="center">
                  <Typography variant="h6">National Team: </Typography>
                  <Typography variant="h6">
                    {playerProfile?.internationalTeam || "N/A"}
                  </Typography>
                  <img
                    src={playerProfile?.internationalTeamImage}
                    style={{ width: "auto", height: "25px" }}
                  />
                </Stack>
              </Stack>
            </Container>

            {/* player profile section */}
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default PlayerProfile;
