import {
  Button,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { isArrayAndHasContent } from "../../utils/utils";
import { Details, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchDropDown = ({ list, handleCloseUserMenu }) => {
  const navigate = useNavigate();

  return (
    <Stack
      mt="10px"
      direction="column"
      gap={1}
      sx={{ width: "100%", maxHeight: "50vh", overflowY: "scroll" }}
    >
      {isArrayAndHasContent(list) ? (
        list?.map((player, index) => {
          return (
            <Card
              sx={{
                minHeight: "50px",
                overflow: "hidden",
                paddingRight: "1em",
              }}
              key={index}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <img
                    src={player?.playerImage}
                    style={{ height: "50px", width: "auto" }}
                  />
                  <Stack direction="column">
                    <Typography>{player?.playerName || "N/A"}</Typography>
                    <Typography fontSize="0.8rem" component="div">
                      {player?.club || "N/A"}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" gap={2}>
                  <img
                    src={player?.nationImage}
                    style={{ height: "auto", width: "20px" }}
                  />
                  <Tooltip title="See Details">
                    <IconButton
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate(`/player/${player?.id}`);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Card>
          );
        })
      ) : (
        <>No Item found</>
      )}
    </Stack>
  );
};

export default SearchDropDown;
