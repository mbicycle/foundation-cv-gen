import type { AxiosInstance } from "axios"
import axios from "axios"
import { getGuestToken } from "shared/utils/getGuestToken"
import graph from "shared/utils/interceptors/ms-graph-interceptor"

export const createAxiosInstance = (url: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: url,
  })
  const token = getGuestToken()

  axiosInstance.interceptors.response.use(
    async (response) => {
      if (response.headers && !token) {
        const msalRequest = graph.getRequest()
        const tokenSilent = await graph.msalInstance.acquireTokenSilent(msalRequest)
        response.headers.Authorization = `Bearer ${tokenSilent.idToken}`
      }

      return response
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.request.use(
    async (request) => {
      if (request.headers && !token) {
        const msalRequest = graph.getRequest()
        const tokenSilent = await graph.msalInstance.acquireTokenSilent(msalRequest)
        request.headers.Authorization = `Bearer ${tokenSilent.idToken}`
        request.headers["Content-Type"] = "application/json"
      }

      return request
    },
    async (error) => {
      Promise.reject(error)
    },
  )

  return axiosInstance
}
