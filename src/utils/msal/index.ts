import { msGraph } from '@mbicycle/msal-bundle';

const redirectUri: string = import.meta.env.VITE_REDIRECT_URL || 'https://localhost:3000/';

const msGraphInstance = msGraph({
  configOverride: {
    redirectUri,
  },
});

export default msGraphInstance;
