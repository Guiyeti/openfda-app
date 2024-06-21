import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, CircularProgress } from '@mui/material';

const DetailComponent = () => {
  const { id } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.fda.gov/drug/label.json?search=id:${id}`)
      .then(response => {
        setDrugDetails(response.data.results[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: '20px' }}>
      {drugDetails ? (
        <div>
          <Typography variant="h4">{drugDetails.brand_name}</Typography>
          <Typography variant="h6">Generic Name: {drugDetails.generic_name}</Typography>
          <Typography variant="body1">{drugDetails.description}</Typography>
          {/* Add more fields as required */}
        </div>
      ) : (
        <Typography variant="h6">No details available</Typography>
      )}
    </Paper>
  );
};

export default DetailComponent;
