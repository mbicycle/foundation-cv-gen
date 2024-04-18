import type { MsUser } from "common/models/User"

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
