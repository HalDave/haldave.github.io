import * as React from "react";
import styles from "./App.module.css";
import TopBar from "../UI/TopBar";
import Sidebar from "../Content/SideBar";
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
import ProtectedRoute from "../UI/ProtectedRoute";

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
    <div className={`App ${styles.appRoot}`}>
      <QueryClientProvider client={itemsQueryClient}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <CssBaseline />
          <TopBar onClick={handleDrawerToggle} />
          <Sidebar
            mobileOpen={mobileOpen}
            isMobile={isMobile}
            onClose={handleDrawerToggle}
          />
          <div className={`${styles.mainArea}${!isMobile ? ` ${styles.desktop}` : ""}`}>
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="hobbies" element={<Hobbies />} />
                <Route path="work" element={<Work />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <BottomBar isDarkTheme={isDarkTheme} />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
