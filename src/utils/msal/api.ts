import type { MsUser } from "msal-bundle/dist/models";
import * as msGraph from "msal-bundle";

export const getUser = async (): Promise<MsUser> => new Promise<MsUser>(
    (resolve, reject) => {
        msGraph.graphClient.api('/me')
            .select('givenName,mail,surname')
            .get()
            .then((response: MsUser) => resolve(response))
            .catch((error) => reject(error));
    },
);
