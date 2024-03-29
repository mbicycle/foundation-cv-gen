import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

export const DatePickerStyled = styled(DatePicker)({
  button: {
    padding: '0 3px 0 0',
  },
});

export const DatePickerPaperStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});
