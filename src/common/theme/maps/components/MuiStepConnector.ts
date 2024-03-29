import { defaultTheme } from 'common/theme/maps/defaultTheme';
import { palette } from 'common/theme/maps/palette';

const MuiStepConnector = {
  styleOverrides: {
    root: {
      padding: defaultTheme.spacing(0, 7),
      '& span': {
        borderColor: palette.divider,
      },
    },
  },
};
export default MuiStepConnector;
