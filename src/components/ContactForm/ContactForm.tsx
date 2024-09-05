import React, { useEffect } from "react";
import { Box, Typography, Grid, Paper, TextField, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { useFormik } from "formik";

// Interface for the contact form component props
interface ContactFormProps {
  contact?: Contact;  // Optional prop for editing an existing contact
  onSaveContact: (contact: Contact) => void; // Function to handle saving the contact
}

// Contact form component
const ContactForm: React.FC<ContactFormProps> = ({ contact, onSaveContact }) => {
  
  // Initialize formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      firstName: contact?.firstName || "", // Initial value for the first name (empty if no contact is passed)
      lastName: contact?.lastName || "",   // Initial value for the last name (empty if no contact is passed)
      selection: contact?.selection || "Active", // Default value for the selection is "Active"
    },
    onSubmit: (values) => {
      // On form submission, save the contact using the passed function
      onSaveContact(values);
    },
  });

  // Update form values when a contact is passed for editing
  useEffect(() => {
    if (contact) {
      formik.setValues({
        firstName: contact.firstName, // Set first name to formik state
        lastName: contact.lastName,   // Set last name to formik state
        selection: contact.selection, // Set selection to formik state
      });
    }
  }, [contact]); // Run this effect when the contact prop changes

  return (
    <Box>
      {/* Display form heading based on whether contact is being edited or created */}
      <Typography
        variant="h5"
        fontFamily={"'Montserrat', sans-serif"}
        color="text.secondary"
        textAlign={"center"}
        sx={{ margin: "10px" }}
      >
        {contact ? "Edit Contact" : "Create Contact"}
      </Typography>
      
      <Grid>
        {/* Paper component for form layout */}
        <Paper
          elevation={10}
          sx={{ paddingTop: "20px", paddingLeft: "30px", height: "60vh", width: 460, margin: "20px auto" }}
        >
          {/* Form submission handling with formik */}
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="center" spacing={2}>
              
              {/* First Name input */}
              <Grid item xs={4}>
                <FormLabel htmlFor="firstName" sx={{ textAlign: "right", display: "block", marginRight: 2 }}>
                  First Name
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="firstName"
                  placeholder="Enter your First Name"
                  aria-label="text.firstName"
                  fullWidth
                  type="text"
                  name="firstName"
                  value={formik.values.firstName} // Bind formik value for first name
                  onChange={formik.handleChange}   // Handle changes with formik
                  onBlur={formik.handleBlur}       // Track when input loses focus
                  required
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)} // Show error if touched and invalid
                  helperText={formik.touched.firstName && formik.errors.firstName} // Show helper text if error exists
                />
              </Grid>

              {/* Last Name input */}
              <Grid item xs={4}>
                <FormLabel htmlFor="lastName" sx={{ textAlign: "right", display: "block", marginRight: 2 }}>
                  Last Name
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="lastName"
                  placeholder="Enter your Last Name"
                  aria-label="text.lastName"
                  fullWidth
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}   // Bind formik value for last name
                  onChange={formik.handleChange}   // Handle changes with formik
                  onBlur={formik.handleBlur}       // Track when input loses focus
                  required
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)} // Show error if touched and invalid
                  helperText={formik.touched.lastName && formik.errors.lastName} // Show helper text if error exists
                />
              </Grid>

              {/* Selection radio buttons */}
              <Grid item xs={4}>
                <FormLabel htmlFor="selection" sx={{ textAlign: "right", display: "block", marginRight: 2 }}>
                  Select
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl>
                  <RadioGroup
                    name="selection"
                    value={formik.values.selection} // Bind selection value to formik
                    onChange={formik.handleChange}  // Handle changes with formik
                  >
                    <FormControlLabel value="Active" control={<Radio />} label="Active" /> {/* Active option */}
                    <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" /> {/* Inactive option */}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {/* Submit button */}
            <Button type="submit" variant="contained" sx={{ alignContent: "center", margin: "5px 70px" }}>
              {contact ? "Update Contact" : "Save Contact"} {/* Button label based on mode */}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default ContactForm;
