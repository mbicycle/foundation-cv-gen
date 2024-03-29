import CircleIcon from '@mui/icons-material/Circle';

import { PreviewWarningText } from 'containers/main-page/preview/utils/constants';
import WarningIcon from 'common/icons/Warning';
import { useValidateCV } from 'common/utils/hooks/useValidateCV';

import PersonalDetails from './PersonalDetails';
import TopBox from './TopBox';

const PreviewWrapper = function (): JSX.Element {
  const { isValid, isFetching, invalidBlocks } = useValidateCV();
  return (
    <div className="w-[210mm] m-auto mt-14">
      {!isFetching && !isValid && (
        <div className="bg-white w-[200mm] m-auto mb-4 p-4 flex flex-row items-center justify-start">
          <WarningIcon sx={{ mr: 6, width: '40px', height: '40px' }} />
          <div>
            <p>{PreviewWarningText.Title}</p>
            <p>{PreviewWarningText.Content}</p>
            {invalidBlocks.map((invalidBlock) => (
              <p key={invalidBlock} className="pl-1.5">
                <CircleIcon sx={{ color: 'black' }} />
                {invalidBlock}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white p-3 pb-16 max-w-full">
        <div className="flex flex-col">
          <div className="w-full">
            <TopBox />
          </div>
          <div className="m-auto z-20 max-w-full mt-[-8rem]">
            <PersonalDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewWrapper;
