import { defaultTheme } from 'common/theme/maps/defaultTheme';
import { palette } from 'common/theme/maps/palette';

const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      // eslint-disable-next-line max-len
      'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 30px #f5fcff inset !important',
        height: '3px',
      },
      minHeight: 48,
      marginTop: -2,
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.border,
        bordrWidth: 1,
      },

      input: {
        height: '100%',
        padding: defaultTheme.spacing(2, 2),
      },

      '&:hover fieldset': {
        borderColor: `${palette.border} !important`,
      },

      '& .Mui-disabled': {
        opacity: 1,
        WebkitTextFillColor: palette.text.secondary,
      },
    },
  },
};
export default MuiOutlinedInput;
