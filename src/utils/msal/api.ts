import type { MsUser } from '@mbicycle/msal-bundle/dist/models';

import msGraphInstance from 'utils/msal';

export const getUser = async (): Promise<MsUser> => new Promise<MsUser>(
  (resolve, reject) => {
    msGraphInstance.graphClient.api('/me')
      .select('givenName,mail,surname')
      .get()
      .then((response: MsUser) => resolve(response))
      .catch((error) => reject(error));
  },
);
