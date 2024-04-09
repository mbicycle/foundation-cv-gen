import type { CSSProperties } from 'react';
import React, {
  memo,
  useMemo,
} from 'react';
import type { Control } from 'react-hook-form';
import { Accordion } from '@mbicycle/foundation-ui-kit';
import {
  HelperText, Text, ToolInputText, TOOLS_NAME,
} from 'fields/skills/utils/constants';

import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import DragIndicatorIcon from 'common/icons/DragIndicatorIcon';
import GarbageIcon from 'common/icons/GarbageIcon';
import type { Skill, Tool as ToolType } from 'common/models/User';

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

  const toolText = useMemo(
    () => `${Text.Tool}: ${tool.name} ${tool.level ? `(${tool.level})` : ''}
    ${tool.experience ? `[${tool.experience} year]` : ''}`,
    [tool.name, tool.level, tool.experience],
  );

  const isEmptyName = tool.name.trim().length === 0;
  const emptyNameHelpText = isEmptyName ? HelperText.Skill : errorText;

  return (
    <div className="mx-auto w-full rounded-2xl bg-white p-2" ref={elementRef} style={style}>
      <Accordion defaultOpen={expanded}>
        <Accordion.Title>
          <div className="flex items-center w-full justify-between pr-2">
            <div className="flex items-center w-full pr-2">
              <DragIndicatorIcon className="text-gray-500 size-10" />
              <p className="pl-1">
                {toolText}
              </p>
            </div>
            <button type="button" onClick={onDeleteToolHandle}>
              <GarbageIcon className="text-blue-500" />
            </button>
          </div>
        </Accordion.Title>
        <Accordion.Body>
          <div className="w-full">
            <ReactHookFormTextFieldOutlined
              type="text"
              control={control}
              label={ToolInputText.Label}
              name={`${TOOLS_NAME}.${index}.${ToolInputText.Name}`}
              autoFocus
              error={isEmptyName}
              helperText={emptyNameHelpText}
            />
          </div>
          <div className="flex flex-nowrap gap-8">
            <div className="flex mt-5 w-1/2">
              <LevelSelection
                control={control}
                index={index}
              />
            </div>
            <div className="flex mt-5 w-1/2">
              <TimeUsedInput
                value={tool.experience}
                control={control}
                index={index}
              />
            </div>
          </div>
        </Accordion.Body>
      </Accordion>
    </div>
  );
};

export default memo(Tool);
