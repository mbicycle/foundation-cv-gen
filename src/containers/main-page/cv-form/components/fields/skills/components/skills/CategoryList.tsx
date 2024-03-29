import {
  memo, useCallback, useState,
} from 'react';

import {
  useDeleteSkill,
} from 'containers/main-page/cv-form/components/fields/skills/components/helpers/hooks';
import {
  SKILL_GROUP_ERROR_MESSAGE,
} from 'containers/main-page/cv-form/components/fields/skills/utils/constants';
import { ListWrapperStyled } from 'containers/main-page/cv-form/components/fields/styled';
import { DragItemCategory, DragList } from 'common/components/profiency/styled';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { DbUser, Skill } from 'common/models/User';

import { defaultDragState } from 'fields/skills/components/skills/Constants';
import { useAddOrEditSkill } from 'fields/skills/lib/query-hooks';

import SkillListItem from './CategoryItem';

interface SkillListProps {
  skills: Skill[],
  user: DbUser,
}

interface DragState {
  isDragging: boolean;
  id: string;
  originalIndex: number;
  newIndex: number;
}

const SkillList = function (props: SkillListProps): JSX.Element | null {
  const { skills, user } = props;
  const { mutateAsync, isLoading } = useAddOrEditSkill();
  const { state: tokenState } = useGuestToken();
  const { dispatch } = useGuestUser();
  const { isLastSkillGroup, removeProjectSkillGroupById } = useDeleteSkill();
  user.projects = user.projects || [];

  const [dragState, setDragState] = useState<DragState>(defaultDragState);

  const onDeleteToolHandle = async (id: string): Promise<void> => {
    const projects = user.projects ?? [];
    if (!isLastSkillGroup(id, [...projects])) {
      const catToRemove = skills.find((skill) => skill.id === id);
      if (catToRemove) {
        if (tokenState.isGuest) {
          dispatch({
            skills: user.skills.filter((skill) => skill !== catToRemove),
            projects: removeProjectSkillGroupById(id, [...user.projects]),
          });
        } else {
          await mutateAsync({
            ...user,
            skills: user.skills.filter((skill) => skill !== catToRemove),
            projects: removeProjectSkillGroupById(id, [...projects]),
          });
        }
      }
    } else {
      SnackBarUtils.error(SKILL_GROUP_ERROR_MESSAGE);
    }
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
      const updatedSkills = Array.from(skills);
      const [removed] = updatedSkills.splice(dragState.originalIndex, 1);
      updatedSkills.splice(dragState.newIndex, 0, removed);
      if (tokenState.isGuest) {
        dispatch({
          skills: updatedSkills,
          projects: user.projects,
        });
      } else {
        await mutateAsync({
          ...user,
          skills: updatedSkills,
          projects: user.projects,
        });
      }
    }
    setDragState(defaultDragState);
  }, [dragState.originalIndex, dragState.newIndex, skills, tokenState.isGuest, dispatch, user, mutateAsync]);

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
    <ListWrapperStyled>
      <DragList>
        {skills.map(({ id, tools, name }, index) => {
          const border = {
            border: dragState.newIndex === index && dragState.originalIndex !== dragState.newIndex
              ? '1px solid #2a57e0' : '1px solid #DADCE1',
          };
          return (
            <DragItemCategory
              key={id}
              data-index={index}
              draggable
              onDragStart={() => onDragStart(id, index)}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              $isDropping={dragState.originalIndex === index}
            >
              <SkillListItem
                id={id}
                name={name}
                onDelete={onDeleteToolHandle}
                tools={tools || []}
                isDeleting={isLoading}
                border={border}
              />
            </DragItemCategory>
          );
        })}
      </DragList>
    </ListWrapperStyled>
  );
};

export default memo(SkillList);
