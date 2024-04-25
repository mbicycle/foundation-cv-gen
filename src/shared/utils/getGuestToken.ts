import { GUEST_TOKEN_NAME } from "shared/utils/constants"
import { getCookie } from "shared/utils/cookie"

const params = new URL(document.location.toString()).searchParams

export const getGuestToken = (): string => params.get(GUEST_TOKEN_NAME) || getCookie(GUEST_TOKEN_NAME) || ""
