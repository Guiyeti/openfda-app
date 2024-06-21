import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ResultsComponent = ({ results }) => {
  return (
    <Box width="100%" mt={2}>
      {results.length === 0 ? (
        <Typography variant="h6">No se encontraron resultados</Typography>
      ) : (
        <List>
          {results.map((item, index) => (
            <ListItem button component={Link} to={`/details/${item.id}`} key={index}>
              <ListItemText 
                primary={item.openfda && item.openfda.brand_name ? item.openfda.brand_name[0] : 'No Brand Name'} 
                secondary={item.openfda && item.openfda.generic_name ? item.openfda.generic_name[0] : 'No Generic Name'} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ResultsComponent;
