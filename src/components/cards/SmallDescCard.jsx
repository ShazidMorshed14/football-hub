import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  calculateAgeFromUnixTimestamp,
  convertToMillion,
  getPlayerClubDetails,
  getPlayerCountryDetails,
} from "../../utils/utils";
import PanToolIcon from "@mui/icons-material/PanTool";

const SmallDescCard = ({ player, category, innerRef }) => {
  return (
    <div ref={innerRef}>
      <Card
        sx={{ cursor: "pointer", borderRadius: "8px", position: "relative" }}
        elevation={2}
      >
        {player?.playerInfo?.isGoalkeeper && (
          <div style={{ position: "absolute", top: "15px", right: "15px" }}>
            <PanToolIcon />
          </div>
        )}

        {category !== "ALL" && (
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
              {category}
            </Typography>
          </div>
        )}

        <CardMedia
          component="img"
          height={"300"}
          image={
            player?.playerInfo?.image
              ? player?.playerInfo?.image
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
              {player?.playerInfo?.name
                ? player?.playerInfo?.name?.length > 15
                  ? `${player?.playerInfo?.name?.slice(0, 15)}...`
                  : player?.playerInfo?.name
                : "N/A"}
            </Typography>

            {getPlayerClubDetails(player?.clubId) ? (
              <div
                style={{
                  transform: "translateY(-35px)",
                }}
              >
                <img src={getPlayerClubDetails(player?.clubId)?.image} />
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
              {player?.marketValue
                ? `${convertToMillion(player?.marketValue?.value || 0)}M ${
                    player?.marketValue?.currency
                  }`
                : "N/A"}
            </Typography>

            <Typography gutterBottom fontSize="0.8rem" component="div">
              Age:{" "}
              {player?.birthday
                ? `${calculateAgeFromUnixTimestamp(
                    player?.birthday || 0
                  )} Years `
                : "N/A"}
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography gutterBottom fontSize="0.8rem" component="div">
                Country:{" "}
                {getPlayerCountryDetails(player?.countryId)
                  ? getPlayerCountryDetails(player?.countryId)?.name
                  : "N/A"}
              </Typography>

              {getPlayerCountryDetails(player?.countryId) ? (
                <img src={getPlayerCountryDetails(player?.countryId)?.flag} />
              ) : null}
            </Stack>

            {/* {!player?.playerInfo?.isGoalkeeper && <PanToolIcon />} */}

            <Typography gutterBottom fontSize="0.8rem" component="div">
              Club:{" "}
              {getPlayerClubDetails(player?.clubId)
                ? getPlayerClubDetails(player?.clubId)?.name
                : null}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmallDescCard;
