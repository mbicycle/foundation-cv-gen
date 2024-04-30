import type { MsUser } from "entities/user/model"

import msGraphInstance from "shared/lib/msal/instance"

export const getMyDataFromMsGraph = async (fields: string[]): Promise<unknown> => {
  const token = await msGraphInstance.acquireToken()
  const headers = new Headers()

  headers.append("Authorization", `Bearer ${token}`)

  return fetch(`https://graph.microsoft.com/v1.0/me?$select=${fields.join()}`, {
    method: "GET",
    headers,
  }).then((response) => response.json())
}

export const getUserDataFromMsGraph = async (userId: string, fields: string[]): Promise<MsUser> => {
  const token = await msGraphInstance.acquireToken()
  const headers = new Headers()

  headers.append("Authorization", `Bearer ${token}`)
  return fetch(`https://graph.microsoft.com/v1.0/users/${userId}?$select=mail,${fields.join()}`, {
    method: "GET",
    headers,
  }).then((response) => response.json())
}
