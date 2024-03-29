import type { Project, Skill } from 'common/models/User';

export const getFileName = (name: string, isHidden: boolean): string => {
  const nameArr = name.split(' ');
  if (!isHidden) return `CV_${nameArr.join('_')}`;
  const splitedName = nameArr.map((word, index) => {
    if (index === nameArr.length - 1) {
      return nameArr[index]?.slice(0, -nameArr[index].length + 1);
    }

    return word;
  });

  return `CV_${splitedName.join('_')}`;
};

export const refactorProjectSkills = (
  userSkills: Skill[] | undefined,
  projectArray: Project[] | undefined,
): Project[] | undefined => projectArray?.map((project) => {
  const categories = project.categories?.map((categoryItem) => {
    const mappedFullCategory = categoryItem.split(', ');
    const skill = userSkills?.find((skillItem) => skillItem.id === mappedFullCategory[0]);
    if (skill) {
      const filteredCategories = skill?.tools.filter(
        (toolItem) => mappedFullCategory[1].split(',').includes(toolItem.id),
      );
      return `${skill?.name}: ${filteredCategories?.map((category, index) => {
        if (index === filteredCategories.length - 1) return `${category.name}`;
        return `${category.name}`;
      })}`;
    }
    return '';
  });
  return {
    ...project,
    categories,
  };
});
