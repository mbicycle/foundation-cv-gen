import type { Labels, LevelTool } from "features/cv-form-components/languages/ui/model/level.enum"

export interface UserLanguage {
  level: keyof typeof Labels
  name: string
}

export interface Tool {
  id: string
  name: string
  experience: number
  level: `${LevelTool}` | ""
}

export interface Skill {
  id: string
  name: string
  tools: Tool[]
}

export interface Project {
  id: string
  title: string
  role: string
  from: string
  to: string
  link: string
  description: string
  responsibilities: string[]
  teamSize: number
  categories: string[]
}

export interface Certificate {
  link: string
  name: string
  id: string
  date: Date
  defaultName?: string
}

export interface Category {
  id: string
  name: string
  skills: Skill[]
}

export interface DbUser {
  telegram: string
  email: string
  firstName: string
  lastName: string
  skype: string
  title: string
  summary: string
  languages: UserLanguage[]
  skills: Skill[]
  projects: Project[]
  certificates: Certificate[]
  readonly finished?: boolean
}

export interface GuestUser extends DbUser {
  avatar?: File | Blob
}

export interface MsUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessPhones: any[]
  displayName: string
  givenName: string
  jobTitle: string
  mail: string
  mobilePhone: string
  officeLocation: string
  preferredLanguage: string
  surname: string
  userPrincipalName: string
  id: string
}
