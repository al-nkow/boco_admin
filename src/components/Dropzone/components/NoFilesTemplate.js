import React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const NoFilesTemplate = ({
  fileInputRef,
  multiple,
  onFilesAdded,
  accept,
  size,
}) => {
  return (
    <div>
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        className="FileInput"
        type="file"
        multiple={multiple}
        onChange={onFilesAdded}
        accept={accept}
      />
      {size !== 'cell' && (
        <Title>
          Чтобы загрузить изображение
          <br />
          перетащите его в эту область или нажмите
        </Title>
      )}
      <Button
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<CloudUploadIcon />}
      >
        Выбрать {size !== 'cell' && 'файлы'}
      </Button>
    </div>
  );
};

NoFilesTemplate.propTypes = {
  accept: PropTypes.string.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  onFilesAdded: PropTypes.func.isRequired,
  size: PropTypes.string,
};

NoFilesTemplate.defaultProps = {
  multiple: false,
  size: null,
};

export default NoFilesTemplate;
