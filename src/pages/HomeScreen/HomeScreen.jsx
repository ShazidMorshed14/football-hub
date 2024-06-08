import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { GetAllCountries } from "../../services/countries";
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
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { assetsActions } from "../../store/reducers/assetsReducer";
import { GetCategorywisePlayers } from "../../services/players";
import CategorywisePlayers from "../../components/home/CategorywisePlayers";
import { countryList } from "../../constants/countries";
import { clubList } from "../../constants/clubs";
import { Refresh } from "@mui/icons-material";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width:600px)");

  const category = useSelector((state) => state.asset.category);

  const [value, setValue] = useState(category ? category : "ALL");

  const [countryIds, setCountryIds] = useState(null);
  const [clubIds, setClubIds] = useState(null);
  const [maxMarketValue, setMaxMarketValue] = useState(null);
  const [minMarketValue, setMinMarketValue] = useState(null);
  const [marketValue, setMarketValue] = useState(null);
  const [age, setAge] = useState(null);

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

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    dispatch(assetsActions.changeCategory(newValue));
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
    <div>
      <Container maxWidth="xl">
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
                <Tab label="All" value="ALL" />
                <Tab label="Forward" value="FORWARD" />
                <Tab label="Midfielder" value="MIDFIELDER" />
                <Tab label="Defender" value="DEFENDER" />
                <Tab label="Goalkeeper" value="GOALKEEPER" />
              </TabList>

              <TabPanel value="ALL">
                <CategorywisePlayers
                  type="ALL"
                  expectedType="ALL"
                  countryIds={countryIds}
                  clubIds={clubIds}
                  maxMarketValue={maxMarketValue}
                  minMarketValue={minMarketValue}
                  marketValue={marketValue}
                  age={age}
                />
              </TabPanel>
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
                />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
};

export default HomeScreen;
