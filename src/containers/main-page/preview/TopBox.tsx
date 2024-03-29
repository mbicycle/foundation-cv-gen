import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import {
  Box, Typography,
} from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import {
  ContactWrapperGrid, EmailIconStyled, GridWrapper, LinkWrapperStyled,
  LogoWrapperGrid,
  SkypeIconStyled, TelegramIconStyled,
  TopBoxWrapper,
} from 'containers/main-page/styled';
import { useToggleSensitiveData } from 'common/context';
import LogoIcon from 'common/icons/LogoIcon';

const TopBox = function (): JSX.Element | null {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching('db-user');
  const { state } = useToggleSensitiveData();

  const { email, skype, telegram } = data ?? {};
  const { checked: hiddenSensetiveData } = state;

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  function renderContact(type : 'telegram' | 'skype', contact?: string): JSX.Element | null {
    if (!contact) return null;
    return (
      <ContactWrapperGrid>
        <Box
          display="flex"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        >
          {type === 'telegram' ? <TelegramIconStyled /> : <SkypeIconStyled />}
        </Box>
        <Typography
          variant="h5"
          color="secondary.light"
          sx={{ marginLeft: (theme) => theme.spacing(1.5) }}
        >
          {contact}
        </Typography>
      </ContactWrapperGrid>
    );
  }

  function renderSensetiveData(): JSX.Element | null {
    if (hiddenSensetiveData) return null;

    return (
      <TopBoxWrapper>
        <ContactWrapperGrid>
          <Box
            display="flex"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
          >
            <EmailIconStyled />
          </Box>
          <Typography
            variant="h5"
            color="secondary.light"
            sx={{ paddingBottom: (theme) => theme.spacing(1.25), marginLeft: (theme) => theme.spacing(1.5) }}
          >
            {email}
          </Typography>
        </ContactWrapperGrid>
        {renderContact('skype', skype)}
        {renderContact('telegram', telegram)}
      </TopBoxWrapper>
    );
  }

  return (
    <GridWrapper container wrap="nowrap">
      <LogoWrapperGrid item xs={3}>
        <LogoIcon sx={{ height: 42, width: 174 }} />
      </LogoWrapperGrid>
      <LinkWrapperStyled>
        {renderSensetiveData()}
      </LinkWrapperStyled>
    </GridWrapper>
  );
};

export default TopBox;
