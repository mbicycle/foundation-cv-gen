import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import CircleIcon from '@mui/icons-material/Circle';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';

import RatingLanguage from './RatingLanguage';

const Languages = function (): JSX.Element {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching('db-user');

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  return (
    <div className="max-w-full p-6 mt-4 mx-6 bg-white break-words rounded-lg border drop-shadow">
      <div>
        <div className="grid grid-cols-[0.1fr,2fr,1.1fr] grid-rows-auto">
          <div className="bg-gray-200 size-10 rounded-full flex justify-center items-center">
            <MenuBookIcon className="text-blue-500 size-8" />
          </div>
          <h5 className="ml-4 font-bold">
            {CV_FORM_STEPS[1].text}
          </h5>
          {!!data?.languages?.length && (
            <h5 className="text-gray-500 text-center">
              {CV_FORM_STEPS[1].columns[0]}
            </h5>
          )}
        </div>
        <div className="w-full pt-4" />
        {data?.languages?.map((language) => (
          <div key={language.name} className="grid grid-cols-[1fr,2fr,1.5fr] grid-rows-auto py-1.5">
            <p className="pl-1.5">
              <CircleIcon className="text-blue-500 size-3 mr-1.5 mb-0.5" />
              {language.name}
            </p>
            <div className="m-auto">
              <RatingLanguage level={language.level} />
            </div>
            <p className="text-left pl-5">
              {language.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;