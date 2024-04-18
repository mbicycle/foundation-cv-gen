export const CONFIG = {
  entryPoint: import.meta.env.VITE_ENTRY_POINT || "http://localhost:3000/",
  redirectUri: import.meta.env.VITE_REDIRECT_URL || "http://localhost:3000/",
  apiUrl: import.meta.env.VITE_API_URL,
  tokenApiUrl: import.meta.env.VITE_TOKEN_URL,
  freezed: import.meta.env.VITE_FREEZED,
}
