import { msGraph } from '@mbicycle/msal-bundle';

import { CONFIG } from 'utils/envConfig';

const msGraphInstance = msGraph({
  configOverride: {
    redirectUri: CONFIG.redirectUri,
  },
});

export default msGraphInstance;
