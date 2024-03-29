import React from 'react';

import { Grid, Typography } from '@mui/material';

import { SkillsGridStyled } from 'containers/main-page/styled';
import type { Tool } from 'common/models/User';

import ToolItem from './ToolItem';

interface SkillItemProps {
  title: string;
  gridArea: string;
  tools: Tool[];
}

const SkillItem: React.FC<SkillItemProps> = function (props): JSX.Element | null {
  const { title, gridArea, tools } = props;

  if (!tools) return null;

  return (
    <SkillsGridStyled container>
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto',
        }}
      >
        <Typography />
        <Typography />
        <Typography />
        <Typography
          variant="body1"
          sx={{
            gridArea,
            pt: 2,
            pb: 0,
            textTransform: 'uppercase',
            borderBottom: '1px solid lightgray',
          }}
          color="primary"
        >
          {title}
        </Typography>
        {tools.map((tool) => (
          <ToolItem
            key={tool.id}
            tool={tool}
          />
        ))}
      </Grid>
    </SkillsGridStyled>
  );
};

export default SkillItem;
