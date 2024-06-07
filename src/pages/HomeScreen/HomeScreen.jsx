import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { GetAllCountries } from "../../services/countries";
import { Box, Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { assetsActions } from "../../store/reducers/assetsReducer";
import { GetCategorywisePlayers } from "../../services/players";
import CategorywisePlayers from "../../components/home/CategorywisePlayers";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.asset.category);
  const [value, setValue] = useState(category ? category : "ALL");
  const [page, setPage] = useState(1);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    dispatch(assetsActions.changeCategory(newValue));
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box mt="15px">
          <TabContext value={value}>
            <Box>
              <TabList
                aria-label="Tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                onChange={handleChange}
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
                <CategorywisePlayers type="ALL" expectedType="ALL" />
              </TabPanel>
              <TabPanel value="FORWARD">
                <CategorywisePlayers type="FORWARD" expectedType="FORWARD" />
              </TabPanel>
              <TabPanel value="MIDFIELDER">
                <CategorywisePlayers
                  type="MIDFIELDER"
                  expectedType="MIDFIELDER"
                />
              </TabPanel>
              <TabPanel value="DEFENDER">
                <CategorywisePlayers type="DEFENDER" expectedType="DEFENDER" />
              </TabPanel>
              <TabPanel value="GOALKEEPER">
                <CategorywisePlayers
                  type="GOALKEEPER"
                  expectedType="GOALKEEPER"
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
