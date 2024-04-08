import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mbicycle/foundation-ui-kit';
import { useAddUserLanguage } from 'fields/languages/lib/query-hooks';
import { addUserLanguage } from 'fields/languages/utils/functions';

import { useCategoryLanguageContext } from 'containers/main-page/cv-form/local-state/hooks';
import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { UserLanguage } from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import LanguageSelectionForm from './LanguageSelectionForm';

const EditLanguageCategory = function (): JSX.Element {
  const navigate = useNavigate();
  const { state: { isGuest } } = useGuestToken();
  const { state: user, dispatch } = useGuestUser();
  const { state: languageValue } = useCategoryLanguageContext();
  const { mutateAsync: addLangugeAsync, isLoading } = useAddUserLanguage();

  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [isDirtyLanguageForm, setIsDirtyLanguageForm] = useState(false);
  const [leveledLanguage, setLeveledLanguage] = useState<UserLanguage>({ name: '', level: 'Beginner (A1)' });

  const onSaveHandle = async (): Promise<void> => {
    if (isGuest) dispatch({ languages: addUserLanguage(user, leveledLanguage) });
    else await addLangugeAsync(leveledLanguage);
    navigate('/dashboard/languages');
  };

  const setDirtyFlag = (language: string, level: string): void => {
    const isEqual = language === languageValue.language && level === languageValue.level;
    if (!(isDirtyLanguageForm || isEqual)) setIsDirtyLanguageForm(true);
  };

  const onGetSelectedLanguageHandle = (language: UserLanguage): void => {
    setSaveDisabled(!(language.name && language.level));
    setLeveledLanguage(language);
  };

  useBeforeUnload(isDirtyLanguageForm);
  useUnsaved(isDirtyLanguageForm);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between flex-nowrap gap-6">
        <LanguageSelectionForm
          onGetSelectedLanguage={onGetSelectedLanguageHandle}
          isLoading={isLoading}
          defaultValue={languageValue}
          setDirtyFlag={setDirtyFlag}
        />
      </div>
      <div className="inline-flex w-full pt-4 justify-end">
        <Button
          disabled={isSaveDisabled}
          onClick={onSaveHandle}
          variant="outline"
          isLoading={isLoading}
        >
          {ButtonStep.Save}
        </Button>
      </div>
    </div>
  );
};

export default memo(EditLanguageCategory);
