import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AppSnackbarProvider from 'common/providers/AppSnackbar/AppSnackbarProvider';
import theme from 'common/theme';
import GlobalStyle from 'common/theme/css/globalStyle';

import AppContextProvider from './AppContextProvider';

const AppProvider = function ({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <AppSnackbarProvider>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <GlobalStyle />
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </LocalizationProvider>
        </AppContextProvider>
      </ThemeProvider>
    </AppSnackbarProvider>
  );
};

export default AppProvider;
