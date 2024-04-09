import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon as FileUploadOutlinedIcon } from '@heroicons/react/24/outline';
import { Button, Toggle } from '@mbicycle/foundation-ui-kit';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import RenderOnRole from 'common/components/render-on-role/RenderOnRole';
import { ROUTE } from 'common/components/routes/utils/constants';
import { useToggleSensitiveData } from 'common/context';
import { useGuestToken } from 'common/context/guest-token';
import { useValidateCV } from 'common/utils/hooks/useValidateCV';

import { useSavePDFFile } from './pdf/useSavePdfFile';
import { useSaveWordFile } from './word/hooks/useSaveWordFile';
import { ButtonText } from './constants';

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
        <Toggle
          text="Hide sensitive data"
          checked={checked}
          onChange={handleChange}
          disabled={tokenState.isGuest}
        />
      </RenderOnRole>
      <RenderOnRole roles={['god']}>
        <Button
          className="mx-3 px-6 py-2"
          variant="outline"
          color="secondary"
          onClick={toTableNavigateHandle}
        >
          {pathname.includes(ROUTE.ADMIN.DEFAULT) ? ButtonText.ToDashboard : ButtonText.ToTable}
        </Button>
      </RenderOnRole>
      <Button
        className="mx-3 px-6 py-2"
        variant="outline"
        color="secondary"
        onClick={handleSave}
        disabled={isLoading || !isValid}
        icon={FileUploadOutlinedIcon}
      >
        {ButtonText.ExportDocx}
      </Button>
      <Button
        className="mx-3 px-6 py-2"
        variant="outline"
        color="secondary"
        onClick={handlePdfSave}
        isLoading={savePdfLoaging}
        disabled={isLoading || !isValid}
        icon={FileUploadOutlinedIcon}
      >
        {ButtonText.ExportPDF}
      </Button>
    </>
  );
};
export default memo(PdfButtonSet);
