import {
  memo, useCallback, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useCategoryLanguageContext } from 'containers/main-page/cv-form/local-state/hooks';
import ProfiencyItem from 'common/components/profiency/ProfiencyItem';

interface LeveledLanguageItemProps {
  language: string;
  level: string;
  isDeleting: boolean;
  onDelete: CallableFunction;
}

const LeveledLanguageItem: React.FC<LeveledLanguageItemProps> = function (props): JSX.Element {
  const {
    language, level, isDeleting, onDelete,
  } = props;

  const navigate = useNavigate();
  const { dispatch: dispatchCategoryName } = useCategoryLanguageContext();

  const [isItemDeleting, setIsItemDeleting] = useState(false);

  const openHandle = (): void => {
    dispatchCategoryName({ type: 'set', language, level });
    navigate('edit');
  };

  const onDeleteLanguageHandle = useCallback((): void => {
    setIsItemDeleting(true);
    onDelete(language);
    setIsItemDeleting(false);
  }, [language, onDelete]);

  return (
    <ProfiencyItem
      headText={language}
      bodyText={level}
      onDelete={onDeleteLanguageHandle}
      onClick={openHandle}
      isLoading={isItemDeleting}
      disabled={isDeleting}
    />
  );
};

export default memo(LeveledLanguageItem);
