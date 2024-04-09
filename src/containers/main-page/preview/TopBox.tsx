import { useEffect } from 'react';
import { useIsFetching } from 'react-query';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { useToggleSensitiveData } from 'common/context';
import EmailIcon from 'common/icons/EmailIcon';
import LogoIcon from 'common/icons/LogoIcon';
import SkypeIcon from 'common/icons/SkypeIcon';
import TelegramIcon from 'common/icons/TelegramIcon';

const TopBox = function (): JSX.Element | null {
  const { data, refetch } = useUserFromDb();
  const isFetching = useIsFetching('db-user');
  const { state } = useToggleSensitiveData();

  const { email, skype, telegram } = data ?? {};
  const { checked: hiddenSensetiveData } = state;

  useEffect(() => {
    if (isFetching) refetch();
  }, [refetch, isFetching]);

  function renderContact(type : 'telegram' | 'skype', contact?: string): JSX.Element | null {
    if (!contact) return null;
    return (
      <div className="flex items-center w-full">
        <div className="flex bg-blue-500">
          {type === 'telegram' ? <TelegramIcon className="size-4" /> : <SkypeIcon className="size-4" />}
        </div>
        <h5 className="ml-1.5 text-white">
          {contact}
        </h5>
      </div>
    );
  }

  function renderSensetiveData(): JSX.Element | null {
    if (hiddenSensetiveData) return null;

    return (
      <div className="inline h-[90%] w-min">
        <div className="flex items-center w-full">
          <div className="bg-blue-500 flex">
            <EmailIcon className="size-4" />
          </div>
          <h5 className="pb-1.5 ml-1.5 text-white">
            {email}
          </h5>
        </div>
        {renderContact('skype', skype)}
        {renderContact('telegram', telegram)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 h-[14rem] bg-blue-500">
      <div className="col-span-3 pt-4 pl-8">
        <LogoIcon className="w-[174px] h-[42px]" />
      </div>
      <div className="col-span-9 h-1/2 w-full flex flex-col items-end pt-4 pr-36 pl-20">
        {renderSensetiveData()}
      </div>
    </div>
  );
};

export default TopBox;
