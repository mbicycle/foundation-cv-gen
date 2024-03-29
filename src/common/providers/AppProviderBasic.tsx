import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import theme from 'common/theme';
import GlobalStyle from 'common/theme/css/globalStyle';

const AppProviderBasic = function ({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <GlobalStyle />
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AppProviderBasic;
