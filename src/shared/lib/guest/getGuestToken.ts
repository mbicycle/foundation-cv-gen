import { GUEST_TOKEN_NAME } from "shared/lib/constants"
import { getCookie } from "shared/lib/cookie"

const params = new URL(document.location.toString()).searchParams

export const getGuestToken = (): string => params.get(GUEST_TOKEN_NAME) || getCookie(GUEST_TOKEN_NAME) || ""
