import * as api from "./features/api"
import * as auth from "./features/auth"
import * as hooks from "./hooks"

export default {
  ...hooks.default,
  ...api,
  ...auth,
}
