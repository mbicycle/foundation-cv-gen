export const enum SkillYearsRange {
  Min = 0,
  Max = 100,
}

export const enum Text {
  Category = "Group of Skills Name",
  AddTool = "Add skill",
  AddSkill = "Add a skill group",
  Tool = "Skill",
  Skill = "Skill Group",
  Delete = "Delete",
}

export const enum ToolInputText {
  Label = "Skill",
  Name = "name",
}

export const enum SkillInputText {
  Label = "Skill Group",
  Name = "name",
}

export const enum LevelInputText {
  Label = "Level",
  Name = "level",
}

export const enum TimeUsedInputText {
  Label = "Time used (years)",
  Name = "experience",
}

export const enum HelperText {
  SkillGroup = "Enter skill group name",
  Skill = "Enter skill name",
  SkillLevel = "Enter skill level",
  SkillGroupNameExists = "The entered Skill Group name already exists",
}

export const TOOLS_NAME = "tools" as const
export const DEBOUNCE_TIMEOUT = 300 as const

export const CATEGORY_TOOLTIP_TEXT = `Examples: \n Web Development > Front End > 
  Git or Programming languages > Java Script > Redux` as const

export const SKILL_TOOLTIP_TEXT = `You can fill in this field by entering «Tool(-s)» 
  if you don't have skill. Example: Web Designer > Tools > Figma, Photoshop` as const

export const SKILL_GROUP_ERROR_MESSAGE = `It is impossible to delete a Skill Group
  if it includes skills that are the only ones in one of the projects` as const

export const SKILL_ERROR_MESSAGE = `It is impossible to delete a skill
  if it is the only one in one of the projects` as const
