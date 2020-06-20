import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from '../../../../config/constants';

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100px;
  margin-bottom: 10px;
`;

const StyledCardContent = styled(CardContent)`
  padding-bottom: 0 !important;
`;

const CategoryCardView = ({
  category: { name, comments, _id: id, image },
  askDeleteCategory,
  setEditMode,
}) => {
  const setEdit = () => setEditMode(true);
  const deleteCategory = () => askDeleteCategory(name, id);

  return (
    <>
      <StyledCardContent>
        {image ? <Image src={`${BASE_URL}${image}`} /> : null}
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption">{comments}</Typography>
      </StyledCardContent>
      <CardActions disableSpacing>
        <Tooltip
          title="Удалить магазин"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton aria-label="share" onClick={deleteCategory}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Редактировать"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton aria-label="share" onClick={setEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </>
  );
};

CategoryCardView.propTypes = {
  askDeleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default CategoryCardView;
