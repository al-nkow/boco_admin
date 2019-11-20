import React from 'react';
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
        Выбрать файлы
      </Button>
    </div>
  );
};

export default NoFilesTemplate;
