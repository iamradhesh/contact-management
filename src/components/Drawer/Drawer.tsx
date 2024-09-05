import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Inbox as InboxIcon, BarChart as BarChartIcon, Map as MapIcon } from "@mui/icons-material"; // Importing Material UI icons
import { useNavigate } from "react-router-dom"; // For navigation

interface SidebarProps {
  open: boolean; // Determines whether the sidebar is open
  onClose: () => void; // Function to close the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate(); // React Router's hook to navigate to different routes

  // Function to handle navigation and close the sidebar
  const handleNavigate = (path: string) => {
    navigate(path); // Navigates to the specified path
    onClose(); // Closes the sidebar
  };

  return (
    // Drawer component from MUI for the sidebar
    <Drawer
      anchor="left" // Sidebar opens from the left
      open={open} // Sidebar open state
      onClose={onClose} // Closes the sidebar when clicking outside or when `onClose` is triggered
    >
      {/* List of menu items inside the sidebar */}
      <List>
        {/* First item for "Contacts" */}
        <ListItem button onClick={() => handleNavigate("/contacts")}>
          <ListItemIcon>
            <InboxIcon /> {/* Icon for Contacts */}
          </ListItemIcon>
          <ListItemText primary="Contacts" /> {/* Label for Contacts */}
        </ListItem>
        <Divider /> {/* Divider between items */}
        
        {/* Second item for "Charts" */}
        <ListItem button onClick={() => handleNavigate("/charts")}>
          <ListItemIcon>
            <BarChartIcon /> {/* Icon for Charts */}
          </ListItemIcon>
          <ListItemText primary="Charts" /> {/* Label for Charts */}
        </ListItem>
        <Divider />
        
        {/* Third item for "Map" */}
        <ListItem button onClick={() => handleNavigate("/map")}>
          <ListItemIcon>
            <MapIcon /> {/* Icon for Map */}
          </ListItemIcon>
          <ListItemText primary="Map" /> {/* Label for Map */}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
