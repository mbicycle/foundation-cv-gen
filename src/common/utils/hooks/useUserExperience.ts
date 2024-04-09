import dayjs from 'dayjs';
import { projectDatePresent } from 'fields/projects/components/utils/constants';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import type { Project } from 'common/models/User';

function round(num: number, step = 0.5): number {
  const invert = 1.0 / step;
  const result = Math.floor(num * invert) / invert;
  if (num && !result) return 0.5;
  return result;
}

export const getYearsExperience = (projects?: Project[]): string => {
  const dates: string[] = [];
  projects?.forEach((project) => {
    const to = project.to === projectDatePresent ? new Date().toString() : project.to;
    dates.push(project.from, to);
  });
  const orderedDates = dates.sort((a, b) => (Date.parse(a) > Date.parse(b) ? 1 : -1));

  const firstDate = dayjs(orderedDates[0]);
  let lastDate = dayjs(orderedDates[orderedDates.length - 1]);
  if (firstDate.isSame(lastDate, 'day')) {
    lastDate = lastDate.clone().add(30, 'days');
  }
  const years = lastDate.diff(firstDate, 'years', true);

  return round(years) > 0 ? `${round(years)}+` : '';
};

export const useUserExperience = (): string => {
  const { data } = useUserFromDb();

  const { projects } = data ?? {};

  return getYearsExperience(projects);
};
