import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import ArticleIcon from '@mui/icons-material/Article';
import CircleIcon from '@mui/icons-material/Circle';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CV_FORM_STEPS, QueryKey } from 'containers/main-page/cv-form/utils/constants';

import { formatDateAsianStandart } from './lib/helpers';

const Certifications: React.FC = function () {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching(QueryKey.DbUser);

  const { certificates } = data ?? {};

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  if (!certificates?.length) return null;

  return (
    <div className="max-w-full p-6 mt-4 mx-6 bg-white break-words rounded-lg border drop-shadow">
      <div className="grid grid-cols-12">
        <div className="flex flex-row items-center col-span-12">
          <div className="bg-gray-200 size-10 rounded-full flex justify-center items-center">
            <ArticleIcon className="text-blue-500 size-8" />
          </div>
          <h5 className="ml-4 font-bold">
            {CV_FORM_STEPS[4].text}
          </h5>
        </div>
        <div className="col-span-9" />
        <div className="col-span-3">
          <h5 className="text-center text-gray-500">
            {CV_FORM_STEPS[4].columns[0]}
          </h5>
        </div>
      </div>
      {certificates.map((certificate) => (
        <div key={certificate.name + certificate.id} className="grid grid-cols-12 py-2">
          <div className="col-span-9">
            <p className="pl-1.5">
              <CircleIcon className="text-blue-500 size-3 mr-1.5 mb-0.5" />
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {certificate.name}
              </a>
            </p>
          </div>
          <div className="col-span-3">
            <p>
              {formatDateAsianStandart(certificate.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
