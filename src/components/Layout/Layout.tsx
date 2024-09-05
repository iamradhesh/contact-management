// src/components/Layout/Layout.tsx
import React, { useState } from "react";
import { Box, AppBar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../Drawer/Drawer"; // Import the Sidebar component

// Define the props for the Layout component
interface LayoutProps {
  children: React.ReactNode; // Children elements to be rendered inside the Layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control the visibility of the sidebar

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar component */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* AppBar at the top of the page */}
        <AppBar position="static">
          <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
            {/* Button to open/close the sidebar */}
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            {/* Title of the application */}
            <Typography
              variant="h5"
              fontFamily="'Montserrat', sans-serif"
              sx={{ textAlign: "center", flexGrow: 1 }}
            >
              Contact Management App
            </Typography>
          </Box>
        </AppBar>
        {/* Container for main content */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {children} {/* Render the children components here */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
