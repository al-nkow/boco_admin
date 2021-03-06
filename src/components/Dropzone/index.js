import React, { useRef, useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import PreviewItem from './components/PreviewItem';
import NoFilesTemplate from './components/NoFilesTemplate';
import { red } from '../../config/colors';

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
  &.active {
    &.cell {
      padding: 0;
      border: none;
      .cell {
        margin: 0;
      }
    }
  }
`;

const ErrorBlock = styled.div`
  padding: 10px 0;
  color: ${red};
`;

const Dropzone = ({
  disabled,
  multiple,
  maxFileSize,
  accept,
  onChange,
  value,
  size,
}) => {
  const fileInputRef = useRef();
  const [error, setError] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (value && !value.length) setSelectedFiles([]);
  }, [value]);

  const addFilePreview = file => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file'));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const openFileDialog = () => {
    if (disabled || selectedFiles.length || error) return;
    fileInputRef.current.click();
  };

  const acceptFiles = files => {
    let filesArray = [...files];
    if (maxFileSize) {
      filesArray = filesArray.filter(
        item => item.size / 1000000 < maxFileSize,
      );
    }

    if (maxFileSize && files.length > filesArray.length) {
      setError('Один из файлов превышает допустимый размер 2 Мб!');
      setTimeout(() => setError(''), 3000);
    }

    filesArray.forEach(async (item, index) => {
      try {
        filesArray[index].preview = await addFilePreview(item);
      } catch (err) {
        console.error('Error: ', err);
      }
      setSelectedFiles([...filesArray]);
      onChange(filesArray);
    });
  };

  const onFilesAdded = event => {
    if (disabled) return;
    const { files } = event.target;
    acceptFiles(files);
  };

  const onDragOver = event => {
    event.preventDefault();
    if (disabled) return;
    if (!highlight) setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = event => {
    event.preventDefault();
    setHighlight(false);
    if (disabled) return;
    const { files } = event.dataTransfer;
    acceptFiles(files);
  };

  const removeItem = index => {
    const newFilesArray = [...selectedFiles];
    newFilesArray.splice(index, 1);
    setSelectedFiles(newFilesArray);
    onChange(newFilesArray);
  };

  const cursorStyle =
    disabled || selectedFiles.length ? 'default' : 'pointer';
  const activeClass =
    selectedFiles && selectedFiles.length ? 'active' : '';

  return (
    <Wrap
      className={`${
        highlight ? 'hovered' : ''
      } ${size} ${activeClass}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: cursorStyle }}
    >
      {error && <ErrorBlock>{error}</ErrorBlock>}
      {!error && !selectedFiles.length ? (
        <NoFilesTemplate
          fileInputRef={fileInputRef}
          onFilesAdded={onFilesAdded}
          accept={accept}
          multiple={multiple}
          size={size}
        />
      ) : (
        ''
      )}
      {selectedFiles.length
        ? selectedFiles.map((item, index) => (
            <PreviewItem
              key={item.lastModified}
              file={item}
              index={index}
              removeItem={removeItem}
              size={size}
            />
          ))
        : ''}
    </Wrap>
  );
};

Dropzone.propTypes = {
  accept: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  maxFileSize: PropTypes.number.isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  value: PropTypes.object,
};

Dropzone.defaultProps = {
  disabled: false,
  multiple: false,
  size: null,
  value: null,
};

export default Dropzone;
