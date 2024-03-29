import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
  ButtonStyled,
  MessageContainerStyled,
  MessageTitleStyled,
} from 'common/components/info-pages/styled';

const NOT_FOUND_PAGE_TEXT = 'The requested url does not exist';
const NOT_FOUND_BTN_TEXT = 'GO TO MAIN PAGE';

const NotFound = function (): JSX.Element {
  const navigate = useNavigate();
  const redirectCallback = (): void => {
    navigate('/');
  };
  return (
    <MessageContainerStyled>
      <MessageTitleStyled variant="h2">{NOT_FOUND_PAGE_TEXT}</MessageTitleStyled>
      <ButtonStyled onClick={redirectCallback}>
        {NOT_FOUND_BTN_TEXT}
      </ButtonStyled>
      <Typography variant="h1">404</Typography>
    </MessageContainerStyled>
  );
};

export default NotFound;
