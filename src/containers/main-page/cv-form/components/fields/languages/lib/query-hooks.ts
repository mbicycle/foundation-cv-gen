import type { UseMutationResult } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { QueryKey } from 'containers/main-page/cv-form/utils/constants';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import type { DbUser, UserLanguage } from 'common/models/User';

import {
  addUserLanguage,
  deleteUserLanguage,
} from 'fields/languages/utils/functions';

import * as api from './api';

export function useAddUserLanguage(): UseMutationResult<DbUser, Error, UserLanguage, VoidFunction> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();

  return useMutation<DbUser, Error, UserLanguage, VoidFunction>(
    (language: UserLanguage): Promise<DbUser> => {
      if (user) {
        const languages = addUserLanguage(user, language);
        return api.modifyUserLanguages(languages, user);
      }
      return queryClient.getQueryData(QueryKey.DbUser) as Promise<DbUser>;
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data);
      },
      onError: (error: Error, _: UserLanguage, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}

export function useDeleteUserLanguage(): UseMutationResult<DbUser, Error, string, unknown> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();
  const languages = user?.languages;

  return useMutation<DbUser, Error, string, VoidFunction>(
    async (name) => {
      const filteredLanguages = deleteUserLanguage(languages || [], name);
      return api.modifyUserLanguages(filteredLanguages as UserLanguage[], user as DbUser);
    },

    {
      onSettled: async (data, err, lang) => {
        const filteredLanguages = deleteUserLanguage(languages || [], lang);
        queryClient.setQueryData(QueryKey.DbUser, { ...data, languages: filteredLanguages });
      },
      onError: (error: Error, _: string, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}
