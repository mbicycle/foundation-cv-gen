import type { DbUser, GuestUser, Project, Skill } from "entities/user/model"

export const updateProjects = (user: DbUser | GuestUser | undefined, project: Project): Project[] => {
  const projects = user?.projects || []
  const index = projects.findIndex((p) => p.id === project.id)
  if (index !== -1) projects[index] = project
  else projects.push(project)
  return projects
}

export const getFilteredSkillGroups = (
  userSkills: Skill[],
  usedSkillCategories: string[],
  currentSkill: Skill | undefined,
): Skill[] => {
  const filteredSkillGroups = userSkills.filter(
    (userSkill) => !usedSkillCategories.includes(userSkill.id) && userSkill.id !== currentSkill?.id,
  )

  if (currentSkill) filteredSkillGroups.unshift(currentSkill)

  return filteredSkillGroups
}
