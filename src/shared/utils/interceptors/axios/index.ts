import { createAxiosInstance } from './createAxiosInstance';

const axiosInstance = createAxiosInstance(import.meta.env.VITE_API_URL);
const axiosInstanceToken = createAxiosInstance(import.meta.env.VITE_TOKEN_URL);
const timeTrackerInstance = createAxiosInstance(import.meta.env.VITE_TIMETRACKER_URL);

export { axiosInstance, axiosInstanceToken, timeTrackerInstance };
