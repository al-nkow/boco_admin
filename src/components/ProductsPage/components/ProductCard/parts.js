import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import FolderIcon from '@material-ui/icons/Folder';
import LocationCityIcon from '@material-ui/icons/LocationCity';

export const Image = styled.img`
  width: 100%;
  display: block;
  @media (max-width: 599px) {
    max-width: 100px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const SubTitle = styled.div`
  font-size: 14px;
`;

export const StyledFolderIcon = styled(FolderIcon)`
  &.MuiSvgIcon-root {
    font-size: 17px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 5px;
  }
`;

export const StyledLocationCityIcon = styled(LocationCityIcon)`
  &.MuiSvgIcon-root {
    font-size: 17px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 5px;
  }
`;

export const StyledPaper = styled(Paper)`
  position: relative;
  padding-right: 56px;
  @media (max-width: 599px) {
    padding-right: 0;
  }
`;

export const Controls = styled.div`
  width: 46px;
  position: absolute;
  top: 10px;
  right: 10px;
`;