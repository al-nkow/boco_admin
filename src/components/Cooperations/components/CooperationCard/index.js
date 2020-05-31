import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { StyledCard } from '../../../SharedComponents';
import { red, blue } from '../../../../config/colors';

// const BocoArt = styled.div`
//   display: inline-block;
//   padding: 2px 6px;
//   border-radius: 2px;
//   background: ${red};
//   color: #ffffff;
//   font-size: 12px;
//   margin-top: 10px;
//   opacity: 0.5;
// `;

const Name = styled.div`
  color: ${blue};
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Warning = styled.span`
  color: ${red};
  font-weight: bold;
`;

const Check = styled(CheckBoxIcon)`
  &.MuiSvgIcon-root {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    color: ${blue};
    margin-top: -1px;
  }
`;

const CoperationCard = ({
  cooperation: {
    amount,
    // bocoArticle,
    comments,
    dateTo,
    email,
    // expireAt,
    fizName,
    inn,
    mailOnly,
    orgName,
    orgOnly,
    phone,
  },
}) => {
  const dateArr = dateTo.split('-');
  const formatedDateTo = `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;

  return (
    <StyledCard>
      <CardContent>
        {orgName ? <Name>{orgName}</Name> : ''}
        {fizName ? <Name>{fizName}</Name> : ''}
        {inn ? <div>ИНН: {inn}</div> : ''}
        <div>
          Количество: <Warning>{amount}</Warning>
        </div>
        <div>
          Актуально до: <Warning>{formatedDateTo}</Warning>
        </div>
        <div>Email: {email}</div>
        <div>Телефон: {phone}</div>
        <div>
          {mailOnly ? (
            <>
              <Check /> Только по почте
            </>
          ) : (
            ''
          )}
        </div>
        <div>
          {orgOnly ? (
            <>
              <Check /> Дружить только с юрлицами
            </>
          ) : (
            ''
          )}
        </div>
        <div>Комментарии: {comments}</div>
        {/* <BocoArt>{bocoArticle}</BocoArt> */}
      </CardContent>
    </StyledCard>
  );
};

CoperationCard.propTypes = {
  cooperation: PropTypes.object.isRequired,
};

export default CoperationCard;
