import React from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withSnackbar } from 'notistack';
import WithConfirmAction from '../../../WithConfirmAction';
import { StyledCard } from '../../../SharedComponents';
import { red, blue } from '../../../../config/colors';
import { LOAD_STATES } from '../../../../config/constants';

const StyledCardContent = styled(CardContent)`
  padding-bottom: 0 !important;
`;

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
  confirm,
  enqueueSnackbar,
  CooperationStore: { deleteCooperation },
  cooperation: {
    _id,
    amount,
    bocoArticle,
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

  const performDeleteCooperation = async () => {
    const deleteState = await deleteCooperation(_id, bocoArticle);

    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar(
        'Ошибка при попытке удалить участника кооперации',
        {
          variant: 'error',
        },
      );
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Участник кооперации успешно удален', {
        variant: 'success',
      });
    }
  };

  const askDeleteCooperation = () => {
    confirm({
      message: `Вы уверены что хотите удалить заявку на кооперацию от 
      "${fizName || orgName}"? 
      Это действие невозможно будет отменить.`,
    })
      .then(performDeleteCooperation)
      .catch(() => {});
  };

  return (
    <StyledCard>
      <StyledCardContent>
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
      </StyledCardContent>
      <CardActions disableSpacing>
        <Tooltip
          title="Удалить кооперацию"
          placement="right"
          enterDelay={500}
        >
          <IconButton
            aria-label="delete"
            onClick={askDeleteCooperation}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

CoperationCard.propTypes = {
  confirm: PropTypes.func.isRequired,
  cooperation: PropTypes.object.isRequired,
  CooperationStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CooperationStore')(
  WithConfirmAction(withSnackbar(CoperationCard)),
);
