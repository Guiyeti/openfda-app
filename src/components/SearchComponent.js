import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import '../styles/SearchComponent.css';  // Asegúrate de que la ruta es correcta

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
    }
  };

  return (
    <Box className="search-container">
      <TextField
        className="search-input"
        label="Buscar Medicamento"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch} variant="contained" color="primary" className="search-button">
        Buscar
      </Button>
    </Box>
  );
};

export default SearchComponent;
