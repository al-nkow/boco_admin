import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Header from '../Header';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  max-width: 1000px;
  margin: 0 auto;
`;

const ShopsPage = () => {
  return (
    <div>
      <Header title="Магазины" />
      <Box p={3}>
        <StyledPaper>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/*<TextField*/}
                {/*  name="email"*/}
                {/*  label="Email"*/}
                {/*  value={email}*/}
                {/*  helperText={*/}
                {/*    errors.email && touched.email ? errors.email : ''*/}
                {/*  }*/}
                {/*  error={errors.email && touched.email}*/}
                {/*  onChange={handleChange}*/}
                {/*  onBlur={handleBlur}*/}
                {/*  fullWidth*/}
                {/*  type="email"*/}
                {/*/>*/}
                <TextField
                  autoComplete="off"
                  name="text"
                  label="Название"
                  fullWidth
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="text"
                  label="Комментарии"
                  fullWidth
                  type="text"
                />
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Box>
    </div>
  );
};

export default ShopsPage;