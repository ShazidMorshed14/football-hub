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

const App = () => {
  return (
    <QueryWrapper>
      <ThemeWrapper>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/create-team" element={<CreateTeam />} />
            <Route exact path="/my-team" element={<MyTeam />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/player/:id" element={<PlayerProfile />} />
          </Routes>
        </Router>
      </ThemeWrapper>
    </QueryWrapper>
  );
};

export default App;
