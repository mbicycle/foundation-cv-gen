import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  FormControlLabel, FormGroup, Switch, Typography,
} from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import RenderOnRole from 'common/components/render-on-role/RenderOnRole';
import { ROUTE } from 'common/components/routes/utils/constants';
import { useToggleSensitiveData } from 'common/context';
import { useGuestToken } from 'common/context/guest-token';
import { useValidateCV } from 'common/utils/hooks/useValidateCV';

import { useSavePDFFile } from './pdf/useSavePdfFile';
import { useSaveWordFile } from './word/hooks/useSaveWordFile';
import { ButtonText } from './constants';
import { LoadingButtonStyled } from './styled';

const PdfButtonSet = function (): JSX.Element | null {
  const { isValid } = useValidateCV();
  const { handleSave: handlePdfSave, loading: savePdfLoaging } = useSavePDFFile();
  const { state, dispatch } = useToggleSensitiveData();
  const { handleSave } = useSaveWordFile();
  const { isLoading } = useUserFromDb();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state: tokenState } = useGuestToken();

  useEffect(() => {
    if (tokenState.isGuest) dispatch({ checked: true });
  }, [dispatch, tokenState.isGuest]);

  const { checked } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ checked: event.target.checked });
  };

  const toTableNavigateHandle = (): void => {
    if (pathname.includes(ROUTE.ADMIN.DEFAULT)) {
      navigate(`dashboard/${ROUTE.DASHBOARD.PERSONAL_INFORMATION}`);
    } else navigate(ROUTE.ADMIN.DEFAULT);
  };

  return (
    <>
      <RenderOnRole roles={['admin', 'god']}>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                checked={checked}
                onChange={handleChange}
                color="secondary"
                disabled={tokenState.isGuest}
              />
            )}
            label={<Typography color="white">Hide sensitive data</Typography>}
          />
        </FormGroup>
      </RenderOnRole>
      <RenderOnRole roles={['god']}>
        <LoadingButtonStyled
          variant="outlined"
          color="secondary"
          onClick={toTableNavigateHandle}
        >
          {pathname.includes(ROUTE.ADMIN.DEFAULT) ? ButtonText.ToDashboard : ButtonText.ToTable}
        </LoadingButtonStyled>
      </RenderOnRole>
      <LoadingButtonStyled
        startIcon={<FileUploadOutlinedIcon fontSize="medium" />}
        variant="outlined"
        color="secondary"
        onClick={handleSave}
        loadingPosition="start"
        sx={{ color: (theme) => theme.palette.primary.main }}
        disabled={isLoading || !isValid}
      >
        {ButtonText.ExportDocx}
      </LoadingButtonStyled>
      <LoadingButtonStyled
        startIcon={<FileUploadOutlinedIcon fontSize="medium" />}
        variant="outlined"
        color="secondary"
        onClick={handlePdfSave}
        loadingPosition="start"
        loading={savePdfLoaging}
        disabled={isLoading || !isValid}
      >
        {ButtonText.ExportPDF}
      </LoadingButtonStyled>
    </>
  );
};
export default memo(PdfButtonSet);
