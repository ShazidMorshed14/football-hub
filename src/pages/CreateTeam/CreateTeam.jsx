import Formation433 from "../../assets/formations/4-3-3.jpg";
import Formation442 from "../../assets/formations/4-4-2.jpg";
import Formation343 from "../../assets/formations/3-4-3.jpg";
import Formation523 from "../../assets/formations/5-2-3.jpg";
import Formation532 from "../../assets/formations/5-3-2.jpg";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
  useMediaQuery,
  Typography,
  Modal,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import {
  calculateAgeFromUnixTimestamp,
  convertToMillion,
  createFormationObject,
  isArrayAndHasContent,
} from "../../utils/utils";
import { countryList } from "../../constants/countries";
import { clubList } from "../../constants/clubs";
import CategorywisePlayers from "../../components/home/CategorywisePlayers";
import toast from "react-hot-toast";
import TeamBoard from "../../components/cards/TeamBoard";

const formationList = [
  {
    label: "4-3-3",
    value: "4-3-3",
    img: Formation433,
  },
  {
    label: "4-4-2",
    value: "4-4-2",
    img: Formation442,
  },
  {
    label: "3-4-3",
    value: "3-4-3",
    img: Formation343,
  },
  {
    label: "5-2-3",
    value: "5-2-3",
    img: Formation523,
  },
  {
    label: "5-3-2",
    value: "5-3-2",
    img: Formation532,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const CreateTeam = () => {
  const [formation, setFormation] = useState(null);
  const [formationObject, setFormationObject] = useState(null);
  console.log(formationObject);
  const [team, setTeam] = useState([]);
  console.log(team);

  const isMobile = useMediaQuery("(max-width:600px)");

  const [value, setValue] = useState("FORWARD");

  const [countryIds, setCountryIds] = useState(null);
  const [clubIds, setClubIds] = useState(null);
  const [maxMarketValue, setMaxMarketValue] = useState(null);
  const [minMarketValue, setMinMarketValue] = useState(null);
  const [marketValue, setMarketValue] = useState(null);
  const [age, setAge] = useState(null);

  const [teamViewModal, setTeamViewModal] = useState(false);

  const generateAgeOptions = () => {
    let options = [];
    for (let i = 16; i <= 45; i++) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return options;
  };

  const addPlayerToTeam = (player, category) => {
    console.log(player);
    //check if the player is alreadyAdded or not
    let checkIntheTeam = team.filter((p) => p?.playerDetails?.id == player?.id);
    if (isArrayAndHasContent(checkIntheTeam)) {
      toast.error(`Player already added!`, {
        duration: 2000,
      });
      return;
    }

    const playerObject = {
      category: category,
      playerDetails: {
        ...player,
        age: calculateAgeFromUnixTimestamp(player?.birthday),
        marketValue: parseInt(
          convertToMillion(player?.marketValue?.value || 0)
        ),
      },
    };

    // Calculate the current total market value of the team
    const currentTotalMarketValue = team.reduce(
      (total, p) => total + p?.playerDetails?.marketValue,
      0
    );

    // Check if adding the new player's market value exceeds the limit
    if (
      currentTotalMarketValue + playerObject.playerDetails?.marketValue >
      700
    ) {
      toast.error(`Total market value cannot exceed 700M!`, {
        duration: 2000,
      });
      return;
    }

    // Calculate the current average age of the team
    const currentTotalAge = team.reduce(
      (total, p) => total + p?.playerDetails?.age,
      0
    );

    // Calculate the new average age if the player is added
    const newTotalAge = currentTotalAge + playerObject.playerDetails.age;
    const newAverageAge = (newTotalAge / (team.length + 1)).toFixed(2);

    // Check if the new average age is within the range 25 to 27
    if (newAverageAge < 25 || newAverageAge > 27) {
      toast.error(
        `Adding this player will make the average age ${newAverageAge}, which is outside the range of 25 to 27  years!`,
        {
          duration: 3000,
        }
      );
      return;
    }

    // Check if the category count is greater than zero
    if (formationObject[category] > 0) {
      // Update the formation object by decrementing the category count
      let updatedFormationObj = {
        ...formationObject,
        [category]: formationObject[category] - 1,
      };

      console.log(updatedFormationObj);

      // Update the formation state
      setFormationObject(updatedFormationObj);

      // Add the player to the team list
      setTeam((prevTeam) => [...prevTeam, playerObject]);

      if (team?.length == 10) {
        toast("Good Job!Your team is Ready!", {
          icon: "👏",
          duration: 2000,
        });
      } else {
        // Show success notification
        toast.success("Player added successfully!", {
          duration: 2000,
        });
      }
    } else {
      // Show error notification if the category is full
      toast.error(`No more ${category.toLowerCase()}s can be added!`, {
        duration: 2000,
      });
    }
  };

  const handleFormationReset = () => {
    setFormation(null);
    setFormationObject(null);
    handleRefresh();
    setTeam([]);
  };

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleCountryChange = (event) => {
    setCountryIds(event.target.value);
  };
  const handleClubChange = (event) => {
    setClubIds(event.target.value);
  };

  const handleRefresh = () => {
    setCountryIds(null);
    setClubIds(null);
    setMaxMarketValue(null);
    setMarketValue(null);
    setAge(null);
  };

  const handleMarketValue = (event) => {
    setMaxMarketValue(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={teamViewModal && isArrayAndHasContent(team)}
        onClose={() => {
          setTeamViewModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TeamBoard
            formation={formation}
            setTeamViewModal={setTeamViewModal}
            team={team}
          />
        </Box>
      </Modal>

      <Container maxWidth="xl">
        <Box mt="15px">
          <Typography>Create Your Own Team</Typography>

          <Stack my="15px" direction="row" alignItems="center">
            <FormControl sx={{ m: 1, minWidth: "80vw" }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Formation
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formation}
                label="Select Formation"
                onChange={(e) => {
                  let formationObject = createFormationObject(e.target.value);
                  setFormationObject(formationObject);
                  setFormation(e.target.value);
                }}
              >
                {formationList.map((f) => {
                  return (
                    <MenuItem value={f.value} key={f.value}>
                      <Stack
                        gap={2}
                        alignItems="center"
                        sx={{ maxWidth: 200 }}
                        direction="row"
                      >
                        <img
                          src={f?.img}
                          style={{ width: "50px", height: "50px" }}
                        />
                        {f?.label}
                      </Stack>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Fab
              size="small"
              color="primary"
              aria-label="refresh"
              onClick={handleFormationReset}
              sx={{
                marginLeft: "5px",
                minWidth: "40px",
                minHeight: "40px",
              }}
            >
              <Refresh />
            </Fab>
          </Stack>

          {/* {isArrayAndHasContent(team) && <TeamBoard team={team} />} */}
          {isArrayAndHasContent(team) && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setTeamViewModal(true)}
            >
              View Team
            </Button>
          )}
        </Box>

        {formation && (
          <Stack direction="column" mt="15px">
            <Typography>Select Player for {formation} </Typography>

            {/* player selection panel */}
            <>
              <div
                style={{
                  overflow: isMobile ? "scroll" : "hidden",
                  marginTop: "15px",
                  display: "flex",
                  gap: "10",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  scrollbarWidth: "1px !important",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Country</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={countryIds}
                    label="Country"
                    onChange={handleCountryChange}
                  >
                    {countryList.map((country) => {
                      return (
                        <MenuItem value={country.id} key={country.id}>
                          <Stack
                            gap={2}
                            alignItems="center"
                            sx={{ maxWidth: 200 }}
                            direction="row"
                          >
                            <img src={country?.flag} />
                            {country?.name}
                          </Stack>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Club</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={clubIds}
                    label="Club"
                    onChange={handleClubChange}
                  >
                    {clubList.map((club) => {
                      return (
                        <MenuItem value={parseInt(club?.id)} key={club.id}>
                          <Stack
                            gap={2}
                            alignItems="center"
                            sx={{ maxWidth: 200 }}
                            direction="row"
                          >
                            <img
                              src={club?.image}
                              style={{ width: "20px", height: "20px" }}
                            />
                            {club?.name}
                          </Stack>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={(e) => setAge(e.target.value)}
                  >
                    {generateAgeOptions()}
                  </Select>
                </FormControl>

                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Market Value (Max)"
                  variant="outlined"
                  placeholder="Enter Market Value"
                  onChange={handleMarketValue}
                  type="number"
                  value={maxMarketValue === null ? "" : maxMarketValue}
                  sx={{
                    minWidth: "140px",
                  }}
                />

                {maxMarketValue && (
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ marginLeft: "5px", minWidth: "100px" }}
                    onClick={() => setMarketValue(maxMarketValue)}
                  >
                    Search
                  </Button>
                )}

                <Fab
                  size="small"
                  color="primary"
                  aria-label="refresh"
                  onClick={handleRefresh}
                  sx={{
                    marginLeft: "5px",
                    minWidth: "40px",
                    minHeight: "40px",
                  }}
                >
                  <Refresh />
                </Fab>
              </div>
              <Box mt="15px">
                <TabContext value={value}>
                  <Box>
                    <TabList
                      aria-label="Tabs example"
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      onChange={handleTabChange}
                      textColor="secondary"
                      indicatorColor="primary"
                    >
                      <Tab label="Forward" value="FORWARD" />
                      <Tab label="Midfielder" value="MIDFIELDER" />
                      <Tab label="Defender" value="DEFENDER" />
                      <Tab label="Goalkeeper" value="GOALKEEPER" />
                    </TabList>

                    <TabPanel value="FORWARD">
                      <CategorywisePlayers
                        type="FORWARD"
                        expectedType="FORWARD"
                        countryIds={countryIds}
                        clubIds={clubIds}
                        maxMarketValue={maxMarketValue}
                        minMarketValue={minMarketValue}
                        marketValue={marketValue}
                        age={age}
                        addPlayerToTeam={addPlayerToTeam}
                        createTeamEnable={true}
                      />
                    </TabPanel>
                    <TabPanel value="MIDFIELDER">
                      <CategorywisePlayers
                        type="MIDFIELDER"
                        expectedType="MIDFIELDER"
                        countryIds={countryIds}
                        clubIds={clubIds}
                        maxMarketValue={maxMarketValue}
                        minMarketValue={minMarketValue}
                        marketValue={marketValue}
                        age={age}
                        addPlayerToTeam={addPlayerToTeam}
                        createTeamEnable={true}
                      />
                    </TabPanel>
                    <TabPanel value="DEFENDER">
                      <CategorywisePlayers
                        type="DEFENDER"
                        expectedType="DEFENDER"
                        countryIds={countryIds}
                        clubIds={clubIds}
                        maxMarketValue={maxMarketValue}
                        minMarketValue={minMarketValue}
                        marketValue={marketValue}
                        age={age}
                        addPlayerToTeam={addPlayerToTeam}
                        createTeamEnable={true}
                      />
                    </TabPanel>
                    <TabPanel value="GOALKEEPER">
                      <CategorywisePlayers
                        type="GOALKEEPER"
                        expectedType="GOALKEEPER"
                        countryIds={countryIds}
                        clubIds={clubIds}
                        maxMarketValue={maxMarketValue}
                        minMarketValue={minMarketValue}
                        marketValue={marketValue}
                        age={age}
                        addPlayerToTeam={addPlayerToTeam}
                        createTeamEnable={true}
                      />
                    </TabPanel>
                  </Box>
                </TabContext>
              </Box>
            </>

            {/* player selection panel */}
          </Stack>
        )}
      </Container>
    </div>
  );
};

export default CreateTeam;
