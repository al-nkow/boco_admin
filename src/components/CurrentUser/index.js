import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Wrap } from '../SharedComponents';
import ChangePassword from './components/ChangePassword';
import CurrentUserData from './components/CurrentUserData';

const CurrentPage = () => {
  return (
    <Wrap>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <CurrentUserData />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <ChangePassword />
        </Grid>
      </Grid>
    </Wrap>
  );
};

export default CurrentPage;
