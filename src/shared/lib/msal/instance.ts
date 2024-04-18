import { CONFIG } from "shared/config/envConfig"

import { msGraph } from "@mbicycle/msal-bundle"

const msGraphInstance = msGraph({
  configOverride: {
    redirectUri: CONFIG.redirectUri,
  },
})

export default msGraphInstance
