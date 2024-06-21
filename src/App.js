import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';
import ResultsComponent from './components/ResultsComponent';
import DetailComponent from './components/DetailComponent';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (searchTerm) => {
    setError('');
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}`;

    axios.get(url)
      .then(response => {
        if (response.data.results) {
          setResults(response.data.results);
        } else {
          setResults([]);
          setError('No se encontraron resultados.');
        }
      })
      .catch(error => {
        console.error(error);
        setResults([]);
        if (error.response && error.response.status === 404) {
          setError('No se encontraron resultados.');
        } else {
          setError('Hubo un error al buscar. Inténtalo de nuevo más tarde.');
        }
      });
  };

  return (
    <Router>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" mt={2}>
          <SearchComponent onSearch={handleSearch} />
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          <ResultsComponent results={results} />
        </Box>
        <Routes>
          <Route path="/details/:id" element={<DetailComponent />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
