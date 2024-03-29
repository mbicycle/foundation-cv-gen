import React from 'react';

import { Grid } from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import SkillItem from 'containers/main-page/preview/preview-skills/SkillItem';
import {
  BoxWrapperStyled,
  ColumnsHeaderStyled,
  PaperWrapperStyled,
  PreviewTableHeaderStyled,
  SchoolIconStyled,
  SectionTitle,
} from 'containers/main-page/styled';

const PreviewSkills = function (): JSX.Element | null {
  const { data } = useUserFromDb();

  const { skills } = data ?? {};

  const renderCategories = (): JSX.Element[] | null => {
    if (!skills) return null;

    return (
      skills.map(({ id, name: skillName, tools }) => {
        const gridArea = '2 / 1 / 2 / 4';

        return (
          <SkillItem
            key={id}
            title={skillName}
            gridArea={gridArea}
            tools={tools}
          />
        );
      })
    );
  };

  return (
    <PaperWrapperStyled elevation={1}>
      <Grid container>
        <BoxWrapperStyled>
          <SchoolIconStyled color="primary" />
        </BoxWrapperStyled>
        <PreviewTableHeaderStyled
          item
          xs={11}
        >
          <SectionTitle variant="h5">
            {CV_FORM_STEPS[2].text}
          </SectionTitle>
          <ColumnsHeaderStyled variant="body1" color="text.secondary" align="center">
            {CV_FORM_STEPS[2].columns[1]}
          </ColumnsHeaderStyled>
          <ColumnsHeaderStyled variant="body1" color="text.secondary" align="center">
            {CV_FORM_STEPS[2].columns[2]}
          </ColumnsHeaderStyled>
        </PreviewTableHeaderStyled>
        {renderCategories()}
      </Grid>
    </PaperWrapperStyled>
  );
};

export default PreviewSkills;
