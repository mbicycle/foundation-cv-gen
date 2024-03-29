import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthError } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from 'shared/utils/authConfig';
import { Text } from 'shared/utils/constants';
import { msalInstance } from 'shared/utils/interceptors';

import { Button, Typography } from '@mui/material';

import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import MicrosoftIcon from 'common/icons/MicrosoftIcon';

import { MsLoginContainerStyled } from './styled';

type StateLocation = {
from?: {pathname?: string}
}

const MicrosoftLoginComponent = function (): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as StateLocation)?.from?.pathname || '/';

  const { logger } = useMsal();

  const handleLogin = async (): Promise<void> => {
    navigate({ pathname: '/' });
    try {
      await msalInstance.loginPopup(loginRequest);
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof AuthError) {
        logger.error(error?.message);
        SnackBarUtils.error(error?.message);
      }
    }
  };

  return (
    <MsLoginContainerStyled>
      <Button variant="contained" onClick={handleLogin}>
        <MicrosoftIcon />
        <Typography
          sx={{ textTransform: 'initial', pl: 2 }}
          variant="body2"
        >
          {Text.ButtonLogin}
        </Typography>
      </Button>
    </MsLoginContainerStyled>
  );
};

export default memo(MicrosoftLoginComponent);
