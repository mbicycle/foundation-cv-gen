import { useMemo } from 'react';

import { Grid, Typography } from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import { PaperWrapperStyled, PhotoStyled } from 'containers/main-page/styled';
import { useToggleSensitiveData } from 'common/context';
import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';
import { useUserExperience } from 'common/utils/hooks/useUserExperience';

import { PersonIconStyled } from 'fields/personal-information/file-upload/utils/styled';

import { useMsGraph } from './lib/query-hooks';

const PersonalInformation = function (): JSX.Element {
  const { data: dbData } = useUserFromDb();
  const { photo } = useUserPhoto();
  const yearsExperience = useUserExperience();
  const { data: msGraphData } = useMsGraph({ params: ['jobTitle', 'givenName', 'surname'] });
  const { state: { checked } } = useToggleSensitiveData();

  const {
    title, firstName, lastName, summary,
  } = dbData ?? {};
  const { givenName, surname, jobTitle } = msGraphData ?? {};

  const userName = useMemo(
    () => {
      const name = {
        first: givenName ? `${givenName}` : `${firstName ?? ''}`,
        last: surname ? `${surname}` : `${lastName ?? ''}`,
      };

      if (name.first) {
        return checked ? `${name.first} ${name.last[0]}.` : `${name.first} ${name.last}`;
      }
      return '';
    },
    [givenName, firstName, surname, lastName, checked],
  );

  function renderUserImage(): JSX.Element {
    if (!photo || checked) return <PersonIconStyled $width={66} />;

    return (
      <PhotoStyled
        referrerPolicy="no-referrer"
        alt="User"
        src={photo}
      />
    );
  }

  function renderYearsExperience(): JSX.Element | null {
    if (!yearsExperience || !parseFloat(yearsExperience)) {
      return (
        <Typography
          variant="body2"
          align="center"
          color="primary.main"
        >
          Complete the &quot;Projects&quot; section
        </Typography>
      );
    }

    return (
      <>
        <Typography
          variant="h3"
          align="center"
          color="primary.main"
        >
          {yearsExperience}
        </Typography>
        <Typography
          variant="caption"
          align="center"
        >
          Work Experience
        </Typography>
      </>
    );
  }

  return (
    <PaperWrapperStyled elevation={1}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {renderUserImage()}
        </Grid>
        <Grid item xs={7}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'fontWeightBold' }}
          >
            {userName}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'fontWeightLight' }}
          >
            {title || jobTitle}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          {renderYearsExperience()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="fontWeightBold">
            {CV_FORM_STEPS[0].columns[0]}
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {summary}
          </Typography>
        </Grid>
      </Grid>
    </PaperWrapperStyled>
  );
};

export default PersonalInformation;
