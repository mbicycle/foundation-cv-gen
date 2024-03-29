/* eslint-disable max-len */
/* eslint-disable no-console */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import type { Configuration } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md

 * https://medium.com/sopra-steria-norge/msal-react-automatically-sign-in-users-and-get-app-roles-30893449ed87
 */

const redirectUri = import.meta.env.NODE_ENV === 'development' ? 'https://localhost:3001/' : import.meta.env.VITE_REDIRECT_URL;

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    authority: import.meta.env.VITE_CLIENT_AUTHORITY || '',
    redirectUri,
    navigateToLoginRequestUrl: true,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    secureCookies: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: string, containsPii: boolean): void => {
        if (containsPii) return;

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.ReadWrite.All'],
};
