import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import type { Control, FieldArrayWithId, FormState } from 'react-hook-form';

import {
  ToolsContainerStyled,
} from 'containers/main-page/cv-form/components/fields/skills/utils/styled';
import { DragItemTool, DragList } from 'common/components/profiency/styled';
import type {
  Skill, Tool as ToolType,
} from 'common/models/User';

import { defaultDragState } from 'fields/skills/components/skills/Constants';

import Tool from '.';

interface IToolListProps {
    tools: FieldArrayWithId<Skill, 'tools'>[],
    control: Control<Skill, unknown>,
    formState: FormState<Skill>,
  move: (from: number, to: number) => void,
    newTool: ToolType | undefined,
    onDeleteToolHandle: (deleteSkillPosition: number, deleteSkillId: string) => void,
}

interface DragState {
    isDragging: boolean;
    id: string;
    originalIndex: number;
    newIndex: number;
}

function ToolList(props: IToolListProps): JSX.Element {
  const {
    tools,
    move,
    formState,
    newTool,
    control,
    onDeleteToolHandle,
  } = props;

  const [expandedId, setExpandedId] = useState(newTool?.id ?? '');
  const elementRef = useRef<null | HTMLDivElement>(null);
  const scrollToElement = (): void => elementRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });

  const [dragState, setDragState] = useState<DragState>(defaultDragState);

  useEffect(() => {
    setExpandedId(newTool?.id ?? '');
  }, [newTool]);

  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 250);
  }, [expandedId]);

  const handleExpanded = (toolId: string): void => {
    const extendedId = toolId === expandedId ? '' : toolId;
    setExpandedId(extendedId);
  };

  const onDragStart = (id: string, index: number): void => {
    setDragState({
      isDragging: true,
      id,
      originalIndex: index,
      newIndex: index,
    });
  };

  const onDragEnd = useCallback(async (): Promise<void> => {
    if (dragState.originalIndex !== dragState.newIndex) {
      move(dragState.originalIndex, dragState.newIndex);
    }

    setDragState(defaultDragState);
  }, [dragState.newIndex, dragState.originalIndex, move]);

  const onDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
    const targetIndex = parseInt(e.currentTarget.getAttribute('data-index') || '-1', 10);
    if (dragState.originalIndex !== targetIndex && dragState.newIndex !== targetIndex) {
      setDragState({
        ...dragState,
        newIndex: targetIndex,
      });
    }
  };

  const onDragLeave = (): void => {
    setDragState({
      ...dragState,
      newIndex: dragState.originalIndex,
    });
  };

  return (
    <ToolsContainerStyled>
      <DragList>
        { tools.map((tool, index) => {
          const border = {
            border: dragState.newIndex === index && dragState.originalIndex !== dragState.newIndex
              ? '1px solid #2a57e0' : '1px solid #DADCE1',
          };
          return (
            <DragItemTool
              key={tool.id}
              data-index={index}
              draggable
              onDragStart={() => onDragStart(tool.id, index)}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              $isDropping={dragState.originalIndex === index}
            >
              <Tool
                key={tool.id}
                tool={tools[index]}
                index={index}
                expanded={expandedId === tool.id}
                handleExpanded={handleExpanded}
                onDeleteTool={() => onDeleteToolHandle(index, tools[index].id)}
                control={control}
                errorText={formState.errors?.tools && formState.errors?.tools[index]?.name?.message}
                style={border}
                elementRef={elementRef}
              />
            </DragItemTool>
          );
        })}
      </DragList>
    </ToolsContainerStyled>
  );
}

export default ToolList;
