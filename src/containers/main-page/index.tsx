import { memo } from 'react';

import CvFormProvider from './cv-form/local-state/CVFormProvider';
import CVForm from './cv-form';
import Preview from './preview';

const MainPage = function (): JSX.Element {
  return (
    <div className="bg-white box-border flex flex-row w-full overflow-x-auto h-full">
      <CvFormProvider>
        <CVForm />
      </CvFormProvider>
      <div className="flex flex-nowrap h-full w-full min-w-[213mm] bg-gray-100 sm:overflow-auto">
        <Preview />
      </div>
    </div>
  );
};

export default memo(MainPage);
