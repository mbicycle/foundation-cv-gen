import { FolderIcon } from '@heroicons/react/24/solid';
import { Divider } from '@mbicycle/foundation-ui-kit';
import { v4 as uuidv4 } from 'uuid';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';

import PreviewProjectItem from './PreviewProjectItem';

const PreviewProjects: React.FC = function () {
  const { data } = useUserFromDb();
  const { projects } = data ?? {};

  return (
    <div className="max-w-full p-6 mt-4 mx-6 bg-white break-words rounded-lg border drop-shadow">
      <div className="flex flex-row items-center">
        <div className="bg-gray-200 size-6 rounded-full flex justify-center items-center">
          <FolderIcon className="text-blue-500 size-6" />
        </div>
        <h5 className="ml-4 font-bold">
          {CV_FORM_STEPS[3].text}
        </h5>
      </div>
      {projects?.map(({ ...project }, index) => (
        <div key={uuidv4()}>
          <PreviewProjectItem
            project={project}
          />
          {(projects.length > 0 && projects.length - 1 !== index)
              && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default PreviewProjects;
