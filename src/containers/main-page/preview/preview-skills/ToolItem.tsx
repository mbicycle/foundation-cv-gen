import React from 'react';

import { Typography } from '@mui/material';

import { CircleIconStyled, ListItemContainerStyled } from 'containers/main-page/styled';
import type { Tool } from 'common/models/User';

interface ToolItemProps {
  tool: Tool;
}
const ToolItem: React.FC<ToolItemProps> = function (props) {
  const { tool } = props;
  const { experience, level, name } = tool;

  if (!name) return null;

  return (
    <>
      <ListItemContainerStyled>
        <CircleIconStyled />
        <Typography>
          {name}
        </Typography>
      </ListItemContainerStyled>
      <Typography align="center">
        {experience}
      </Typography>
      <Typography align="left" sx={{ paddingLeft: (theme) => theme.spacing(5) }}>
        {level || ''}
      </Typography>
    </>
  );
};

export default React.memo(ToolItem);
