import { useIsFetching } from 'react-query';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { QueryKey } from 'containers/main-page/cv-form/utils/constants';
import { PreviewWarningText } from 'containers/main-page/preview/utils/constants';

type Validity = {
    isValid: boolean,
    isFetching: boolean,
    invalidBlocks: string[],
}

export const useValidateCV = (): Validity => {
  const { data } = useUserFromDb();
  const isFetching = useIsFetching(QueryKey.DbUser);

  const {
    title = '',
    summary = '',
    languages = [],
    skills = [],
    projects = [],
  } = data ?? {};

  const invalidBlocks = [];

  // Check CV for validity: title, summary, all skill names and tool names
  // must be more than 2 characters length
  // In projects: title, role and description must be more than 2 characters length, team size more than 0
  // English language level is required
  const isInvalidInfo = title.trim().length < 2 || summary.trim().length < 2;
  const isInvalidLanguage = !languages.some(
    (language) => language.name.toLowerCase() === 'english' && language.level?.length,
  );
  const isInvalidSkills = !skills.length
      || skills.some((skill) => skill.name?.trim().length < 2
          || skill.tools?.some((tool) => tool.name?.trim().length < 2));
  const isInvalidProjects = !projects.length
      || projects.some(
        (project) => project.title.length < 2
              || project.role.length < 2
              || project.teamSize <= 0
              || project.description.length < 2,
      );

  const isInvalid = isInvalidInfo || isInvalidLanguage || isInvalidSkills || isInvalidProjects;

  if (isInvalidInfo) invalidBlocks.push(PreviewWarningText.Info);
  if (isInvalidLanguage) invalidBlocks.push(PreviewWarningText.Language);
  if (isInvalidSkills) invalidBlocks.push(PreviewWarningText.Skills);
  if (isInvalidProjects) invalidBlocks.push(PreviewWarningText.Projects);

  return {
    isValid: !isInvalid,
    isFetching: !!isFetching,
    invalidBlocks,
  };
};
