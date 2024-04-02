import { memo } from 'react';
import { useDeleteProject } from 'fields/projects/lib/query-hooks';

import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { Project } from 'common/models/User';

import ProjectItem from './ProjectItem';

const ProjectsList = function (
  { projects }: { projects: Project[]; },
): JSX.Element {
  const { mutateAsync: deleteBy, isLoading } = useDeleteProject();
  const { state: tokenState } = useGuestToken();
  const { dispatch } = useGuestUser();

  const deleteHandle = async (title: string): Promise<void> => {
    if (tokenState.isGuest) {
      const filtered = (
        projects?.filter((project: Project) => project.title !== title)
      );
      dispatch({ projects: filtered });
    } else {
      await deleteBy(title);
    }
  };

  return (
    <div className="listWrapper">
      {projects.map(({
        id, title, from, to,
      }) => (
        <ProjectItem
          key={`${id}_${title}`}
          title={title}
          from={from}
          to={to}
          id={id}
          onDelete={deleteHandle}
          isDeleting={isLoading}
        />
      ))}
    </div>
  );
};

export default memo(ProjectsList);
