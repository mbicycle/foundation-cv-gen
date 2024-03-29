import { createTheme } from '@mui/material';

import { breakpoints } from './maps/breakpoints';
import { components } from './maps/components';
import { palette } from './maps/palette';
import { shadows } from './maps/shadows';
import { shape } from './maps/shape';
import { spacing } from './maps/spacing';
import { transitions } from './maps/transitions';
import { typography } from './maps/typography';
import { zIndex } from './maps/zIndex';

export const theme = createTheme({
  breakpoints,
  palette,
  spacing,
  shape,
  shadows,
  zIndex,
  transitions,
  typography,
  components,
});
