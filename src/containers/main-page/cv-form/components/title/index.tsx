import { memo } from 'react';

import { useSetStep } from 'containers/main-page/cv-form/components/controls/hooks';
import { CVTitles } from 'containers/main-page/cv-form/utils/constants';

import { FieldFormTitleWrapper, FieldTitleStyled } from './styled';

const CVFormTitle = function (): JSX.Element {
  const { activeStep } = useSetStep();

  return (
    <FieldFormTitleWrapper>
      <FieldTitleStyled variant="h2">
        {CVTitles[activeStep]?.title}
      </FieldTitleStyled>
    </FieldFormTitleWrapper>
  );
};

export default memo(CVFormTitle);
