import { defaultTheme } from 'common/theme/maps/defaultTheme';

const MuiSelect = {
  styleOverrides: {
    outlined: {
      padding: 0,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      '.MuiTypography-root': {
        marginTop: 4,
        marginLeft: 12,
      },
      '&.MuiInputBase-input': {
        paddingLeft: defaultTheme.spacing(2),
      },
    },
  },
};
export default MuiSelect;
