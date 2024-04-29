import { CONFIG } from "shared/config/envConfig"

import { createAxiosInstance } from "./createAxiosInstance"

const axiosInstance = createAxiosInstance(CONFIG.apiUrl)
const axiosInstanceToken = createAxiosInstance(CONFIG.tokenApiUrl)

export { axiosInstance, axiosInstanceToken }
