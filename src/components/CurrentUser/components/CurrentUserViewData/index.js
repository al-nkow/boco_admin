import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 100px;
    height: 100px;
  }
`;

const FullHeightGridItem = styled(Grid)`
  height: 100%;
`;

const CurrentUserViewData = ({ userName, userEmail, avatar }) => {
  return (
    <Box p={2}>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item>
            <StyledAvatar alt={userName} src={avatar}>
              R
            </StyledAvatar>
          </Grid>
          <Grid item>
            <FullHeightGridItem
              container
              direction="column"
              justify="center"
            >
              <Grid item>
                <Typography variant="h5">{userName}</Typography>
              </Grid>
              <Grid item>
                <Typography color="primary">{userEmail}</Typography>
              </Grid>
            </FullHeightGridItem>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

CurrentUserViewData.propTypes = {
  avatar: PropTypes.string,
  userEmail: PropTypes.string,
  userName: PropTypes.string,
};

CurrentUserViewData.defaultProps = {
  avatar: '',
  userEmail: '',
  userName: '',
};

export default CurrentUserViewData;
