import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import {
  calculateAgeFromUnixTimestamp,
  convertToMillion,
  getPlayerClubDetails,
  getPlayerCountryDetails,
} from "../../utils/utils";
import PanToolIcon from "@mui/icons-material/PanTool";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const PlayerDetailsPopupCard = ({ player, handleClose }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "25px",
        }}
      >
        <Fab
          size="small"
          color="white"
          aria-label="close"
          onClick={() => handleClose()}
        >
          <Close />
        </Fab>
      </div>
      <Card
        sx={{ cursor: "pointer", borderRadius: "8px", position: "relative" }}
        elevation={2}
      >
        {player?.playerInfo?.isGoalkeeper && (
          <div style={{ position: "absolute", top: "15px", right: "15px" }}>
            <PanToolIcon />
          </div>
        )}

        {player?.category !== "ALL" && (
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              backgroundColor: "darkorange",
              textAlign: "center",
              color: "black",
              padding: "0.2rem",
              borderRadius: "4px",
            }}
          >
            <Typography fontSize="0.7rem" component="div">
              {player?.category || "N?A"}
            </Typography>
          </div>
        )}

        <CardMedia
          component="img"
          height={"120"}
          image={
            player?.playerDetails?.playerInfo?.image
              ? player?.playerDetails?.playerInfo?.image
              : "https://cdn-icons-png.flaticon.com/512/21/21104.png"
          }
          alt="Paella dish"
          aria-setsize="center"
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxHeight: "50px",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {player?.playerDetails?.playerInfo?.name
                ? player?.playerDetails?.playerInfo?.name?.length > 15
                  ? `${player?.playerDetails?.playerInfo?.name?.slice(
                      0,
                      15
                    )}...`
                  : player?.playerDetails?.playerInfo?.name
                : "N/A"}
            </Typography>

            {getPlayerClubDetails(player?.playerDetails?.clubId) ? (
              <div
                style={{
                  transform: "translateY(-35px)",
                }}
              >
                <img
                  src={
                    getPlayerClubDetails(player?.playerDetails?.clubId)?.image
                  }
                />
              </div>
            ) : null}
          </div>

          <Stack direction="column" gap={"5px"} mt="20px">
            <Typography
              gutterBottom
              fontSize="0.9rem"
              component="div"
              color="darkorange"
            >
              Market Value:{" "}
              {player?.playerDetails.marketValue
                ? `${player?.playerDetails.marketValue}M `
                : "N/A"}
            </Typography>

            <Typography gutterBottom fontSize="0.8rem" component="div">
              Age:{" "}
              {player?.playerDetails?.birthday
                ? `${calculateAgeFromUnixTimestamp(
                    player?.playerDetails?.birthday || 0
                  )} Years `
                : "N/A"}
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography gutterBottom fontSize="0.8rem" component="div">
                Country:{" "}
                {getPlayerCountryDetails(player?.playerDetails?.countryId)
                  ? getPlayerCountryDetails(player?.playerDetails?.countryId)
                      ?.name
                  : "N/A"}
              </Typography>

              {getPlayerCountryDetails(player?.playerDetails?.countryId) ? (
                <img
                  src={
                    getPlayerCountryDetails(player?.playerDetails?.countryId)
                      ?.flag
                  }
                />
              ) : null}
            </Stack>

            {/* {!player?.playerInfo?.isGoalkeeper && <PanToolIcon />} */}

            <Typography gutterBottom fontSize="0.8rem" component="div">
              Club:{" "}
              {getPlayerClubDetails(player?.playerDetails?.clubId)
                ? getPlayerClubDetails(player?.playerDetails?.clubId)?.name
                : null}
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              justifyContent="flex-end"
              gap={1}
              pt={2}
            >
              <Button
                variant="contained"
                onClick={() => navigate(`/player/${player?.id}`)}
              >
                More Details
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerDetailsPopupCard;
