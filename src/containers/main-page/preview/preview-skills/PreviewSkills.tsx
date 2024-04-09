import { AcademicCapIcon } from '@heroicons/react/24/solid';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import SkillItem from 'containers/main-page/preview/preview-skills/SkillItem';

const PreviewSkills = function (): JSX.Element | null {
  const { data } = useUserFromDb();

  const { skills } = data ?? {};

  const renderCategories = (): JSX.Element[] | null => {
    if (!skills) return null;

    return (
      skills.map(({ id, name: skillName, tools }) => (
        <SkillItem
          key={id}
          title={skillName}
          tools={tools}
        />
      ))
    );
  };

  return (
    <div className="max-w-full p-6 mt-4 mx-6 bg-white break-words rounded-lg border drop-shadow">
      <div>
        <div className="grid grid-cols-3 grid-rows-auto mb-10">
          <div className="flex flex-row items-center">
            <div className="bg-gray-200 size-10 rounded-full flex justify-center items-center">
              <AcademicCapIcon className="text-blue-500 size-8" color="primary" />
            </div>
            <h5 className="ml-4 font-bold">
              {CV_FORM_STEPS[2].text}
            </h5>
          </div>
          <p className="text-center mt-0.5 text-gray-500">
            {CV_FORM_STEPS[2].columns[1]}
          </p>
          <p className="text-center mt-0.5 text-gray-500">
            {CV_FORM_STEPS[2].columns[2]}
          </p>
        </div>
        {renderCategories()}
      </div>
    </div>
  );
};

export default PreviewSkills;
