import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
