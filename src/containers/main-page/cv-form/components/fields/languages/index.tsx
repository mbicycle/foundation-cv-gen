import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import AddProficiency from 'common/components/add-pattern';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import { ROUTE } from 'common/components/routes/utils/constants';

import LeveledLanguageList from './components/leveled-languages/LeveledLanguageList';

const Languages = function (): JSX.Element {
  const { data, isLoading } = useUserFromDb();
  const location = useLocation();
  const englishLanguage = data?.languages?.find((language) => language.name === 'English');

  if (isLoading) {
    return <CircularSpinner size="large" />;
  }

  return (
    <AddProficiency
      collection={data?.languages || []}
      title="Language"
      disable={!englishLanguage}
    >
      {!location.pathname.includes(ROUTE.EDIT) && <LeveledLanguageList languages={data?.languages || []} />}
    </AddProficiency>
  );
};

export default memo(Languages);
