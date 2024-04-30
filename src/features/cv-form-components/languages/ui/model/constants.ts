import { Level, LevelTool } from "./level.enum"
import type { LevelToolType, LevelType } from "./types"

export const LEVELS: LevelType[] = [
  { name: Level.Beginner },
  { name: Level.PreIntermediate },
  { name: Level.Intermediate },
  { name: Level.UpperIntermediate },
  { name: Level.Advanced },
  { name: Level.Proficiency },
]

export const TOOL_LEVELS: LevelToolType[] = [
  { name: LevelTool.BasicKnowledge },
  { name: LevelTool.LimitedExperience },
  { name: LevelTool.Competent },
  { name: LevelTool.Advanced },
  { name: LevelTool.Expert },
]

export const EnglishLanguageButton = "ENTER YOUR LEVEL"
