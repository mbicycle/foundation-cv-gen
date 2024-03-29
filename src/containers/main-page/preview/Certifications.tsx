import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import ArticleIcon from '@mui/icons-material/Article';
import {
  Grid, Link, Typography,
} from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS, QueryKey } from 'containers/main-page/cv-form/utils/constants';
import {
  BoxWrapperStyled, CircleIconStyled, PaperWrapperStyled, SectionTitle,
} from 'containers/main-page/styled';

import { formatDateAsianStandart } from './lib/helpers';

const Certifications: React.FC = function () {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching(QueryKey.DbUser);

  const { certificates } = data ?? {};

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  if (!certificates?.length) return null;

  return (
    <PaperWrapperStyled
      elevation={1}
    >
      <Grid container>
        <Grid container item xs={11}>
          <BoxWrapperStyled>
            <ArticleIcon color="primary" />
          </BoxWrapperStyled>
          <SectionTitle variant="h5">
            {CV_FORM_STEPS[4].text}
          </SectionTitle>
        </Grid>
        <Grid item xs={9} />
        <Grid
          item
          xs={3}
        >
          <Typography variant="h5" color="text.secondary" align="center">
            {CV_FORM_STEPS[4].columns[0]}
          </Typography>
        </Grid>
        {certificates.map((certificate) => (
          <Grid
            container
            sx={{ padding: (theme) => theme.spacing(0, 2) }}
            key={certificate.name + certificate.id}
          >
            <Grid item xs={9}>
              <Typography
                sx={{ paddingLeft: (theme) => theme.spacing(1.5) }}
              >
                <CircleIconStyled />
                <Link href={certificate.link} target="_blank" rel="noopener noreferrer">
                  {certificate.name}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {formatDateAsianStandart(certificate.date)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </PaperWrapperStyled>
  );
};

export default Certifications;
