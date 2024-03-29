import React from 'react';

import { Rating } from '@mui/material';

import {
  BoxRatingStyled, RectangleBlueIconStyled, RectangleIconStyled,
} from 'containers/main-page/styled';

import { Labels } from 'fields/languages/components/utils/level.enum';

const RatingLanguage = function ({ level }: { level: keyof typeof Labels }): JSX.Element {
  return (
    <BoxRatingStyled>
      <Rating
        name="hover-feedback"
        value={Labels[level]}
        max={6}
        precision={1}
        readOnly
        icon={(
          <RectangleBlueIconStyled
            fontSize="large"
          />
        )}
        emptyIcon={(
          <RectangleIconStyled
            fontSize="large"
          />
        )}
      />
    </BoxRatingStyled>
  );
};

export default React.memo(RatingLanguage);
