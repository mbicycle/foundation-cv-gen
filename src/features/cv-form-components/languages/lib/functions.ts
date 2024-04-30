import type { DbUser, GuestUser, UserLanguage } from "entities/user/model"

export const addUserLanguage = (user: DbUser | GuestUser, language: UserLanguage): UserLanguage[] => {
  let isLanguageExist = false

  const languages = user?.languages || []

  if (user) {
    for (let i = 0; i <= languages?.length; i += 1) {
      if (languages[i]?.name === language?.name) {
        isLanguageExist = true
      }
    }
    if (isLanguageExist) {
      for (let i = 0; i <= languages?.length; i += 1) {
        if (languages[i]?.name === language?.name) {
          languages[i] = language
        }
      }
    } else {
      languages?.push(language)
    }
  }
  return languages
}

export const deleteUserLanguage = (languages: UserLanguage[], name: string): UserLanguage[] =>
  languages.filter((lang: UserLanguage) => lang.name !== name)
