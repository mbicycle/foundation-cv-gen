import {
  memo,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

import { useCategoryLanguageContext } from 'containers/main-page/cv-form/local-state/hooks';
import {
  EnglishLanguageItemStyled,
  LeftSideWrapperStyled,
  TextContainerStyled,
} from 'common/components/profiency/styled';

import { EnglishLanguageButton } from 'fields/languages/components/utils/constants';

interface EnglishLanguageItemProps {
    level?: string;
}

const EnglishLanguageItem: React.FC<EnglishLanguageItemProps> = function ({ level = '' }): JSX.Element {
  const navigate = useNavigate();
  const { dispatch: dispatchCategoryName } = useCategoryLanguageContext();

  const openHandle = (): void => {
    dispatchCategoryName({ type: 'set', language: 'English', level });
    navigate('edit');
  };

  return (
    <EnglishLanguageItemStyled>
      <LeftSideWrapperStyled onClick={openHandle}>
        <TextContainerStyled>
          <Typography variant="body1">English</Typography>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
          >
            {level}
          </Typography>
        </TextContainerStyled>
      </LeftSideWrapperStyled>
      {!level && (
        <Button
          variant="contained"
          onClick={openHandle}
          sx={{
            width: 290,
            wordBreak: 'break-word',
          }}
        >
          {EnglishLanguageButton}
        </Button>
      )}
    </EnglishLanguageItemStyled>
  );
};

export default memo(EnglishLanguageItem);
