import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LineChart from "./components/Chart/LineChart";
import Map from "./components/Chart/Map";
import Layout from "./components/Layout/Layout"; // Layout component manages the sidebar and page layout
import "./App.css";
import { AppBar, Box, Typography } from "@mui/material";

const App = () => {
  return (
    <Router>
      {/* AppBar serves as the top navigation bar with the title */}
      

      {/* Layout component wraps the main content and includes the sidebar */}
      <Layout>
        <Routes>
          {/* Route for the Dashboard page */}
          <Route path="/contacts" element={<Dashboard />} />
          
          {/* Route for displaying the LineChart page */}
          <Route path="/charts" element={<LineChart />} />
          
          {/* Route for displaying the Map page */}
          <Route path="/map" element={<Map />} />

          {/* Default route to render the Dashboard if no path is specified */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
