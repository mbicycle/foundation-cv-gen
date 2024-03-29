import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import { Grid } from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import {
  BoxWrapperStyled, PaperWrapperStyled, SectionTitle,
} from 'containers/main-page/styled';

import { DividerStyled } from 'fields/skills/utils/styled';

import PreviewProjectItem from './PreviewProjectItem';

const PreviewProjects: React.FC = function () {
  const { data } = useUserFromDb();
  const { projects } = data ?? {};

  return (
    <PaperWrapperStyled elevation={1}>
      <Grid container>
        <Grid item container>
          <BoxWrapperStyled>
            <FolderCopyRoundedIcon color="primary" />
          </BoxWrapperStyled>
          <SectionTitle variant="h5">
            {CV_FORM_STEPS[3].text}
          </SectionTitle>
        </Grid>
        {projects?.map(({ ...project }, index) => (
          <React.Fragment key={uuidv4()}>
            <PreviewProjectItem
              project={project}
            />
            {(projects.length > 0 && projects.length - 1 !== index)
              && <DividerStyled sx={{ width: '100%' }} />}
          </React.Fragment>
        ))}
      </Grid>
    </PaperWrapperStyled>
  );
};

export default PreviewProjects;
