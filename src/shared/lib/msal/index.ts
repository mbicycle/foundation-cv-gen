import * as api from "shared/lib/msal/features/api"
import * as auth from "shared/lib/msal/features/auth"

import * as hooks from "./hooks"

export default {
  ...hooks.default,
  ...api,
  ...auth,
}
