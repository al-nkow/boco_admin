import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const CreateCategory = () => {
  return (
    <Box mb={4}>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                autoComplete="off"
                name="text"
                label="Название *"
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                autoComplete="off"
                name="text"
                label="Комментарии"
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={2} container alignContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => {}}
              >
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCategory;
