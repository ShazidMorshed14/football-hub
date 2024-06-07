import SearchAppBar from "../SearchAppBar";
import ThemeWrapper from "./ThemeWrapper";
import QueryWrapper from "./QueryWrapper";

import "../styles/App.css";
import HomeScreen from "../pages/HomeScreen/HomeScreen";

const App = () => {
  return (
    <QueryWrapper>
      <ThemeWrapper>
        <HomeScreen />
      </ThemeWrapper>
    </QueryWrapper>
  );
};

export default App;
