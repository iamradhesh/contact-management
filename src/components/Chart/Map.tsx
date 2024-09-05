// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Leaflet components
import 'leaflet/dist/leaflet.css'; // Leaflet default styles
import L from 'leaflet'; // Leaflet for map functionality

import { Box,  } from '@mui/material'; // Box for layout and IconButton for sidebar toggle

// Parent component to hold both the map and sidebar
const MapWithSidebar: React.FC = () => {
  // State to store the list of countries and their COVID-19 data
  const [countries, setCountries] = useState<any[]>([]);
  

  // Fetch COVID-19 data from the API when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      // Fetching data from the API
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const result = await response.json();
      // Updating state with the fetched data
      setCountries(result);
    };
    fetchCountries(); // Call the fetch function when the component loads
  }, []); // Empty dependency array ensures it runs only once

 

  return (
    <Box display="flex" height="100vh">
     
      

      {/* Main content area containing the map */}
      <Box flex={1} position="relative">
        {/* Sidebar toggle button */}
       

        {/* Main MapContainer component to render the map */}
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          {/* TileLayer to load the map tiles from OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Mapping through the list of countries to display a marker for each */}
          {countries.map((country: any) => (
            <Marker
              key={country.countryInfo.iso2} // Unique key for each marker based on country ISO2 code
              position={[country.countryInfo.lat, country.countryInfo.long]} // Position of the marker (latitude and longitude)

              // Custom marker icon for better visuals
              icon={L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'
              })}
            >
              {/* Popup that appears when clicking on the marker */}
              <Popup>
                <strong>{country.country}</strong><br />
                Active Cases: {country.active}<br />
                Recovered Cases: {country.recovered}<br />
                Deaths: {country.deaths}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapWithSidebar;
