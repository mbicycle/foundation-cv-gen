import { axiosInstance } from "shared/api/axios"
import msGraphInstance from "shared/lib/msal/instance"

type GraphData = AdminTableType.GraphData

const axios = axiosInstance

export const getAllUsers = async (): Promise<GraphData> =>
  new Promise<GraphData>((resolve, reject) => {
    msGraphInstance.graphClient
      .api("/users/delta")
      .header("ConsistencyLevel", "eventual")
      .select("id,displayName,mail,jobTitle")
      .get()
      .then((response: GraphData) => resolve(response))
      .catch((error) => reject(error))
  })

export const getAllDbUsers = async (): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    axios
      .get("employee")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
