import type { UseMutationResult } from 'react-query';
import {
  useMutation,
  useQueryClient,
} from 'react-query';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { QueryKey } from 'containers/main-page/cv-form/utils/constants';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import type { DbUser, Project } from 'common/models/User';

import { updateProjects } from 'fields/projects/components/utils/functions';

import * as api from './api';

export function useUpdateProjects(): UseMutationResult<DbUser, Error, Project, VoidFunction> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();
  const projects = user?.projects || [];

  return useMutation<DbUser, Error, Project, VoidFunction>(
    (project: Project) => {
      projects.push(project as Project);
      return api.updateUserProjects(projects as Project[], user as DbUser);
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data);
      },
      onError: (error: Error, _: Project, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}

export function useUpdateProjectById(): UseMutationResult<DbUser, Error, Project, VoidFunction> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();

  return useMutation<DbUser, Error, Project, VoidFunction>(
    (project: Project) => {
      const projects = updateProjects(user, project);
      return api.updateUserProjects(projects as Project[], user as DbUser);
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data);
      },
      onError: (error: Error, _: Project, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}

export function useDeleteProject(): UseMutationResult<DbUser, Error, string, unknown> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();
  return useMutation<DbUser, Error, string, VoidFunction>(
    (title: string) => {
      const projects = user?.projects;
      const filteredProjects = (
        projects?.filter((project: Project) => project.title !== title)
      );

      return api.updateUserProjects(filteredProjects as Project[], user as DbUser);
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data);
      },
      onError: (error: Error, _: string, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}
