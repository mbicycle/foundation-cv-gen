import type { CSSProperties } from 'react';
import React, {
  memo,
  useMemo,
} from 'react';
import type { Control } from 'react-hook-form';

import {
  AccordionDetails,
  Box,
  Grid, IconButton,
  Typography,
} from '@mui/material';

import { DragIndicatorIconStyled } from 'common/components/profiency/styled';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import GarbageIcon from 'common/icons/GarbageIcon';
import type { Skill, Tool as ToolType } from 'common/models/User';
import { Color } from 'common/theme/maps/config';

import {
  HelperText, Text, ToolInputText, TOOLS_NAME,
} from 'fields/skills/utils/constants';
import {
  AccordionStyled, AccordionSummaryStyled, DividerTool, DragTool,
} from 'fields/skills/utils/styled';

import LevelSelection from './LevelSelection';
import TimeUsedInput from './TimeUsedInput';

interface ToolProps{
  tool: ToolType;
  expanded: boolean;
  handleExpanded: (fieldId: string) => void,
  onDeleteTool: (id: string) => void,
  control: Control<Skill>;
  index: number,
  style?: CSSProperties;
  errorText: string | undefined,
  elementRef?: React.MutableRefObject<HTMLDivElement | null>,
}

const Tool = function (toolProps: ToolProps): JSX.Element {
  const {
    tool,
    expanded,
    handleExpanded,
    onDeleteTool,
    control,
    index,
    errorText,
    elementRef,
    style,
  } = toolProps;

  const onDeleteToolHandle = (): void => {
    onDeleteTool(tool.id);
  };

  const handleExpandedEvent = (): void => {
    handleExpanded(tool.id);
  };

  const toolText = useMemo(
    () => `${Text.Tool}: ${tool.name} ${tool.level ? `(${tool.level})` : ''}
    ${tool.experience ? `[${tool.experience} year]` : ''}`,
    [tool.name, tool.level, tool.experience],
  );

  const isEmptyName = tool.name.trim().length === 0;
  const emptyNameHelpText = isEmptyName ? HelperText.Skill : errorText;
  return (
    <AccordionStyled
      expanded={expanded}
      onChange={handleExpandedEvent}
      ref={expanded ? elementRef : null}
      style={style}
    >
      <AccordionSummaryStyled>
        <DividerTool>
          <DragTool>
            <DragIndicatorIconStyled fontSize="large" />
            <Typography style={{ paddingLeft: '10px' }}>
              {toolText}
            </Typography>
          </DragTool>
          <IconButton onClick={onDeleteToolHandle}>
            <Box color={Color.Blue}>
              <GarbageIcon fontSize="medium" />
            </Box>
          </IconButton>
        </DividerTool>
      </AccordionSummaryStyled>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              variant="outlined"
              type="text"
              control={control}
              label={ToolInputText.Label}
              name={`${TOOLS_NAME}.${index}.${ToolInputText.Name}`}
              autoFocus
              error={isEmptyName}
              helperText={emptyNameHelpText}
            />
          </Grid>
          <Grid
            container
            gap={4}
            wrap="nowrap"
          >
            <Grid
              item
              xs={6}
              sx={{ mt: 5 }}
            >
              <LevelSelection
                control={control}
                index={index}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 5 }}>
              <TimeUsedInput
                value={tool.experience}
                control={control}
                index={index}
              />
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default memo(Tool);
