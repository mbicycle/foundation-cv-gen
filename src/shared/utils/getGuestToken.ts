import { getCookie } from "shared/utils/cookie"

const params = new URL(document.location.toString()).searchParams

export const getGuestToken = (): string => params.get("token") || getCookie("token") || ""
