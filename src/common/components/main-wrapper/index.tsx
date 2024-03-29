import React from 'react';

import { Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

function MainWrapper({ children }: Props): JSX.Element {
  return (
    <Stack direction="row" sx={{ flexGrow: 1 }}>
      {children}
    </Stack>
  );
}

export default MainWrapper;
