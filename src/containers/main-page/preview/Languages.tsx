import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Grid, Typography } from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import {
  BoxWrapperStyled, CircleIconStyled, PaperWrapperStyled, SectionTitle,
} from 'containers/main-page/styled';

import RatingLanguage from './RatingLanguage';

const Languages = function (): JSX.Element {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching('db-user');

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  return (
    <PaperWrapperStyled elevation={1}>
      <Grid container>
        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: '0.1fr 2fr 1.1fr',
            gridTemplateRows: 'auto',
          }}
        >
          <BoxWrapperStyled>
            <MenuBookIcon color="primary" />
          </BoxWrapperStyled>
          <SectionTitle variant="h5">
            {CV_FORM_STEPS[1].text}
          </SectionTitle>
          {!!data?.languages?.length && (
            <Typography variant="h5" color="text.secondary" align="center">
              {CV_FORM_STEPS[1].columns[0]}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sx={{ pt: 4 }} />
        {data?.languages?.map((language) => (
          <Grid
            container
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1.5fr',
              gridTemplateRows: 'auto',
              padding: (theme) => theme.spacing(0, 1.25),
            }}
            key={language.name}
          >
            <Grid item>
              <Typography sx={{ paddingLeft: (theme) => theme.spacing(1.5) }}>
                <CircleIconStyled />
                {language.name}
              </Typography>
            </Grid>
            <Grid item sx={{ margin: 'auto' }}>
              <RatingLanguage level={language.level} />
            </Grid>
            <Grid item sx={{ paddingLeft: (theme) => theme.spacing(5) }}>
              <Typography align="left">
                {language.level}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </PaperWrapperStyled>
  );
};

export default Languages;
