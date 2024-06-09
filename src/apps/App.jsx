import SearchAppBar from "../SearchAppBar";
import ThemeWrapper from "./ThemeWrapper";
import QueryWrapper from "./QueryWrapper";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "../styles/App.css";
import HomeScreen from "../pages/HomeScreen/HomeScreen";

import CreateTeam from "../pages/CreateTeam/CreateTeam";
import SearchPage from "../pages/SearchPage/SearchPage";
import Header from "../components/global/Header";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import MyTeam from "../pages/MyTeam/MyTeam";
import ReduxWrapper from "./ReduxWrapper";
import NoPageFound from "../pages/NoPageFound/NoPageFound";
import Articles from "../components/global/Articles";

const App = () => {
  return (
    <ReduxWrapper>
      <QueryWrapper>
        <ThemeWrapper>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<HomeScreen />} index={true} />
              <Route exact path="/create-team" element={<CreateTeam />} />
              <Route exact path="/my-team" element={<MyTeam />} />
              <Route exact path="/search" element={<SearchPage />} />
              <Route exact path="/player/:id" element={<PlayerProfile />} />

              <Route path="*" element={<NoPageFound />} />
            </Routes>
          </Router>
        </ThemeWrapper>
      </QueryWrapper>
    </ReduxWrapper>
  );
};

export default App;
