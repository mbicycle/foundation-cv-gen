import type { MsUser } from "entities/user/model"

export enum Text {
  ButtonLogin = "Continue with Microsoft",
  ButtonLogout = "Logout",
  CookiePolicy = "single_host_origin",
  CardTitle = "Online CV Generator",
  CardDescription = "Use your corporate email to login",
  Certifications = "CERTIFICATIONS",
}

export const mockUser: MsUser = {
  businessPhones: [],
  displayName: "",
  givenName: "",
  jobTitle: "",
  mail: "",
  mobilePhone: "",
  officeLocation: "",
  preferredLanguage: "",
  surname: "",
  userPrincipalName: "",
  id: "",
}

export const AUTH_COOKIE_NAME = "msalUserEmail"
export const GUEST_TOKEN_NAME = "guestToken"
