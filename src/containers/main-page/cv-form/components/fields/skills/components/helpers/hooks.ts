import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddOrEditSkill } from 'fields/skills/lib/query-hooks';

import { ROUTE } from 'common/components/routes/utils/constants';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type {
  DbUser, Project, Skill,
} from 'common/models/User';

interface SaveSkill {
  isLoading: boolean,
  onSaveSkillHandle: (skill: Skill, user: DbUser) => Promise<void>;
}

export const useSaveSkill = (): SaveSkill => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useAddOrEditSkill();
  const { state: tokenState } = useGuestToken();
  const { dispatch } = useGuestUser();

  const onSaveSkillHandle = useCallback(async (skill: Skill, user: DbUser): Promise<void> => {
    const userSkills = [...user.skills];
    const skillIndex = userSkills.findIndex((skillItem) => skillItem.id === skill.id);

    if (skillIndex === -1) userSkills.push(skill);
    else userSkills[skillIndex] = { ...skill };

    if (tokenState.isGuest) {
      dispatch({ skills: [...userSkills] });
    } else {
      await mutateAsync({ ...user, skills: [...userSkills] });
    }

    navigate(`/dashboard/${ROUTE.DASHBOARD.SKILLS}`);
  }, [dispatch, mutateAsync, navigate, tokenState.isGuest]);

  return {
    isLoading,
    onSaveSkillHandle,
  };
};

interface IUseDeleteSkill {
  isLastSkillGroup: (id: string, projects: Project[]) => boolean,
  isLastSkill: (id: string, projects: Project[]) => boolean | undefined,
  removeProjectSkillById: (skillId: string, projects: Project[]) => Project[],
  removeProjectSkillGroupById: (skillId: string, projects: Project[]) => Project[],
}

export const useDeleteSkill = (): IUseDeleteSkill => {
  const isLastSkillGroup = (id: string, projects: Project[]): boolean => {
    const isLast = projects.filter(
      (project) => project.categories.some(
        (category) => category.split(', ')[0] === id,
      ),
    ).some(
      (project) => project.categories.length === 1,
    ) || false;

    return isLast;
  };

  const isLastSkill = (id: string, projects: Project[]): boolean | undefined => {
    const isLast = projects.filter(
      (project) => project.categories.some(
        (category) => category.includes(id),
      ),
    ).some(
      (project) => project.categories.some(
        (category) => category.split(', ')[1].split(',').length === 1,
      ),
    );

    return isLast;
  };

  const removeProjectSkillById = (
    skillId: string,
    projects: Project[],
  ): Project[] => projects.map((userProject) => {
    const filteredCategories = userProject.categories.map(
      (category) => {
        if (category.includes(skillId)) {
          const filteredCategory = category.split(', ')[1].split(',').filter(
            (categoryItem) => categoryItem !== skillId,
          );
          return [category.split(', ')[0], filteredCategory.join(',')].join(', ');
        }
        return category;
      },
    );

    return {
      ...userProject,
      categories: filteredCategories,
    };
  });

  const removeProjectSkillGroupById = (
    skillGroupId: string,
    projects: Project[],
  ): Project[] => projects.map((userProject) => {
    const filteredCategories = userProject.categories.filter(
      (category) => !category.includes(skillGroupId),
    );

    return {
      ...userProject,
      categories: filteredCategories,
    };
  });

  return {
    isLastSkillGroup,
    isLastSkill,
    removeProjectSkillById,
    removeProjectSkillGroupById,
  };
};
