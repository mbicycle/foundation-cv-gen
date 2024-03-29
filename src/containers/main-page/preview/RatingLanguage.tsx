import React from 'react';
import { Labels } from 'fields/languages/components/utils/level.enum';

import { Rating } from '@mui/material';

import RectangleBlueIcon from 'common/icons/RectangleBlueIcon';
import RectangleIcon from 'common/icons/RectangleIcon';

const RatingLanguage = function ({ level }: { level: keyof typeof Labels }): JSX.Element {
  return (
    <div className="flex justify-center items-center">
      <Rating
        name="hover-feedback"
        value={Labels[level]}
        max={6}
        precision={1}
        readOnly
        icon={(
          <RectangleBlueIcon
            className="text-blue-500 pr-0.5 w-[3.6rem]"
            fontSize="large"
          />
        )}
        emptyIcon={(
          <RectangleIcon
            className="pr-0.5 w-[3.6rem]"
            fontSize="large"
          />
        )}
      />
    </div>
  );
};

export default React.memo(RatingLanguage);
