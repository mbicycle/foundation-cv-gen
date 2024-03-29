import { memo, useMemo } from 'react';

import { ListWrapperStyled } from 'containers/main-page/cv-form/components/fields/styled';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { UserLanguage } from 'common/models/User';

import EnglishLanguageItem from 'fields/languages/components/EnglishLanguageItem';
import { useDeleteUserLanguage } from 'fields/languages/lib/query-hooks';
import { deleteUserLanguage } from 'fields/languages/utils/functions';

import LeveledLanguageItem from './LeveledLanguageItem';

const LeveledLanguageList = function ({
  languages,
}: { languages: UserLanguage[]; }): JSX.Element {
  const { state: tokenState } = useGuestToken();
  const { dispatch } = useGuestUser();
  const { mutateAsync: deleteBy, isLoading } = useDeleteUserLanguage();

  const deleteHandle = async (language: string): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({ languages: deleteUserLanguage(languages, language) });
    } else {
      await deleteBy(language);
    }
  };

  const filteredLanguages = useMemo(
    () => languages.filter((language) => language.name !== 'English'),
    [languages],
  );
  const englishLanguage = languages.find((language) => language.name === 'English');

  return (
    <ListWrapperStyled>
      <EnglishLanguageItem level={englishLanguage?.level} />
      {filteredLanguages.map(({ name, level }) => (
        <LeveledLanguageItem
          key={name}
          language={name}
          level={level}
          onDelete={deleteHandle}
          isDeleting={isLoading}
        />
      ))}
    </ListWrapperStyled>
  );
};

export default memo(LeveledLanguageList);
