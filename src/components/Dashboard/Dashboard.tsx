import React, { useState } from "react";
import { AppBar, Box, Button, Paper, Typography, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import ContactForm from "../ContactForm/ContactForm";

// Define the Contact interface for the shape of contact data
interface Contact {
  firstName: string;
  lastName: string;
  selection: string;
}

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [contacts, setContacts] = useState<Contact[]>([]); // State to manage the list of contacts
  const [editingContact, setEditingContact] = useState<Contact | null>(null); // State for the contact being edited
  

  // Handle the click event for creating a new contact
  const handleClickContact = (): void => {
    setEditingContact(null); // Reset the editing contact state
    setShowForm(true); // Show the contact form
  };

  // Add or update a contact in the list
  const handleAddContact = (newContact: Contact): void => {
    if (editingContact) {
      // If editing, replace the edited contact with the new data
      setContacts(
        contacts.map((contact) =>
          contact === editingContact ? newContact : contact
        )
      );
    } else {
      // If adding a new contact, append it to the list
      setContacts([...contacts, newContact]);
    }
    setShowForm(false); // Hide the form after saving
  };

  // Set the selected contact for editing
  const handleEditContact = (contact: Contact): void => {
    setEditingContact(contact);
    setShowForm(true);
  };

  // Delete a contact from the list
  const handleDeleteContact = (contact: Contact): void => {
    setContacts(contacts.filter((c) => c !== contact));
  };

  return (
    <Box
      className="Dashboard"
      sx={{
        height: "100vh", // Full viewport height
        width: "100%",
        display: "flex",
        overflow: "hidden", // Prevent scrollbars
        flexDirection: "column", // Ensure vertical layout
        marginTop: "20px"
      }}
    >
      

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, width: "80%", margin: "10px auto", alignItems: "center" }}>
        <Paper elevation={10} sx={{ height: "calc(100vh - 64px)", width: "80%", overflowY: "auto", marginLeft: 15 }}>
          
          {/* AppBar for the Contact Page header */}
          <AppBar position="static" sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
              
              <Typography
                variant="h5"
                fontFamily={"'Montserrat', sans-serif"}
                sx={{ textAlign: "center", flexGrow: 1 }}
              >
                Contact Page
              </Typography>
            </Box>
          </AppBar>

          {/* Conditional rendering for the contact form or contact list */}
          {showForm ? (
            // Show the contact form if form visibility is true
            <ContactForm contact={editingContact || undefined} onSaveContact={handleAddContact} />
          ) : (
            <>
              {/* Button to open the form to create a new contact */}
              <Box sx={{ margin: "20px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button
                  onClick={handleClickContact}
                  variant="contained"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    width: 200,
                    marginTop: "20px",
                  }}
                >
                  Create Contact
                </Button>
              </Box>

              {/* If no contacts, display a message; otherwise, show the list of contacts */}
              {contacts.length === 0 ? (
                <Box sx={{ minWidth: 275, height: "60%" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "60%",
                      height: "40%",
                      margin: "10% auto",
                      border: "1px solid black",
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          color: "text.secondary",
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        <Button>
                          <CloseIcon />
                        </Button>
                        &nbsp; There are No contacts yet. Please Add one.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ) : (
                // Map through the contacts and display each one
                <Box sx={{ padding: 2 }}>
                  {contacts.map((contact, index) => (
                    <Card key={index} sx={{ marginBottom: 2 }}>
                      <CardContent>
                        {/* Display the contact's name and selection */}
                        <Typography variant="h6">
                          {contact.firstName} {contact.lastName}
                        </Typography>
                        <Typography variant="body2">Status: {contact.selection}</Typography>
                        
                        {/* Buttons to edit or delete the contact */}
                        <Button variant="contained" onClick={() => handleEditContact(contact)} sx={{ mr: 1 }} color="success">
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => handleDeleteContact(contact)} color="error">
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
