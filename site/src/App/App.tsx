import * as React from "react";
import "./App.css";
import styles from "./App.module.css";
import TopBar from "../UI/TopBar";
import Sidebar from "../UI/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeDetector } from "../Services/ThemeDetector";
import Dashboard from "../Content/Dashboard";
import Work from "../Content/Work";
import Hobbies from "../Content/Hobbies";
import About from "../Content/About";
import { Routes, Route } from "react-router-dom";
import useScreenSize from "../Services/ScreenSize";
import BottomBar from "../UI/BottomBar";
import { QueryClientProvider } from "react-query";
import { itemsQueryClient } from "../Services/api/ItemsQueryClient";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const isDarkTheme = useThemeDetector();
  const { isMobile } = useScreenSize();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="App">
      <QueryClientProvider client={itemsQueryClient}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <CssBaseline />
          <TopBar onClick={handleDrawerToggle} />
          <Sidebar
            mobileOpen={mobileOpen}
            isMobile={isMobile}
            onClose={handleDrawerToggle}
          />
          <div
            className={`${styles.contentContainer}${!isMobile ? ` ${styles.desktop}` : ""}`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="work" element={<Work />} />
              <Route path="hobbies" element={<Hobbies />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
          <BottomBar isDarkTheme={isDarkTheme} />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
