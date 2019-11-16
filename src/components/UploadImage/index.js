import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const Wrap = styled.div`
  width: 100%;
  border: 2px dashed #949494;
  position: relative;
  border-radius: 4px;
  color: #949494;
  text-align: center;
  padding: 20px;
  outline: none;
  &.hovered {
    background: #dddddd;
  }
`;

const Title = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Preview = styled.img`
  width: 200px;
  border-radius: 4px;
`;

const CloseBtnWrap = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const UploadImage = () => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const uploadFile = acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      setUrl(binaryStr);
    };

    console.log('f >>>>>>>', acceptedFiles);
    setFile(acceptedFiles[0]);

    acceptedFiles.forEach(uploadedFile =>
      reader.readAsDataURL(uploadedFile),
    );
  };

  const clear = () => {
    setUrl('');
    setFile('');
  };

  // maxSize 5MB

  return (
    <Dropzone
      onDrop={uploadFile}
      disabled={!!url}
      accept="image/png, image/jpeg"
      minSize={0}
      maxSize={5242880}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject, isFileTooLarge }) => (
        <section>
          <Wrap
            {...getRootProps()}
            className={isDragActive ? 'hovered' : ''}
          >
            {url && (
              <Fragment>
                <Preview src={url} alt="" />
                <CloseBtnWrap>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="delete"
                    onClick={clear}
                  >
                    <CloseIcon />
                  </Fab>
                </CloseBtnWrap>
              </Fragment>
            )}
            <input {...getInputProps()} />
            {!url ? (
              <div>
                <Title>
                  Чтобы загрузить изображение
                  <br />
                  перетащите его в эту область или нажмите
                </Title>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                >
                  Выбрать файлы
                </Button>
                {isDragReject && 'Запрещенный тип файла!'}
                {/* Появляется когда перетаскиваем запрещенный файл в окно! */}
                {isFileTooLarge && (
                  <div>
                    File is too large.
                  </div>
                )}
              </div>
            ) : (
              <div>{file.name}</div>
            )}
          </Wrap>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadImage;
