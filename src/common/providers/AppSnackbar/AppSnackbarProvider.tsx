import { createRef, memo, useCallback } from 'react';
import type { SnackbarKey } from 'notistack';
import { SnackbarProvider } from 'notistack';

import CloseIcon from '@mui/icons-material/Close';

import { SnackbarUtilsConfigurator } from 'common/components/SnackBar/SnackBarUtils';

function IconButtonMemoized(key: SnackbarKey, onClickDismiss: CallableFunction): React.ReactNode {
  return (
    <button
      type="button"
      onClick={(e) => onClickDismiss(e, key)}
    >
      <CloseIcon fontSize="large" />
    </button>
  );
}

const AppSnackbarProvider = function ({ children }: { children: React.ReactElement; }): JSX.Element {
  const notistackRef = createRef<SnackbarProvider>();

  const onClickDismiss = useCallback((_: React.MouseEvent<HTMLButtonElement>, key: SnackbarKey): void => {
    notistackRef.current?.closeSnackbar(key as SnackbarKey);
  }, [notistackRef]);

  return (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      dense
      preventDuplicate
      action={(key) => IconButtonMemoized(key, onClickDismiss)}
      style={{ fontSize: '14px' }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
};

export default memo(AppSnackbarProvider);
