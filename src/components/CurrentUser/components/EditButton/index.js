import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const EditBtnWrap = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
`;

const EditButton = ({ editData }) => {
  return (
    <EditBtnWrap>
      <Tooltip
        title="Редактировать"
        placement="bottom"
        enterDelay={500}
      >
        <IconButton
          color="primary"
          aria-label="close"
          onClick={editData}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </EditBtnWrap>
  );
};

EditButton.propTypes = {
  editData: PropTypes.func.isRequired,
};

export default EditButton;
