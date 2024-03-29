import { memo } from 'react';

import { IconButton } from '@mui/material';

import { useSaveAdminPdfFile } from 'containers/application-bar/pdf/useSavePdfFile';
import { useSaveAdminWordFile } from 'containers/application-bar/word/hooks/useSaveAdminWordFile';
import { useGetDbUser } from 'containers/main-page/cv-form/api/query-hooks';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import DocxIcon from 'common/icons/DocxIcon';
import PdfIcon from 'common/icons/PdfIcon';
import theme from 'common/theme';

interface ActionsSetProps {
  id: string;
  mail: string;
  disabledIcons: boolean;
}

function ActionsSet(props: ActionsSetProps): JSX.Element {
  const { id, mail, disabledIcons } = props;

  const { mutateAsync: getUserBy } = useGetDbUser();
  const { isRetreivingWordUserData, passUser: passUserToWord } = useSaveAdminWordFile();
  const { isRetreivingPdfUserData, loading, passUser: passUserToPdf } = useSaveAdminPdfFile();

  const saveEmployeeWordCvHandle = async (): Promise<void> => {
    const data = await getUserBy(mail);
    passUserToWord(id, data);
  };

  const saveEmployeePdfCvHandle = async (): Promise<void> => {
    const data = await getUserBy(mail);
    passUserToPdf(id, data);
  };

  return (
    <>
      <IconButton
        onClick={saveEmployeeWordCvHandle}
        disabled={isRetreivingWordUserData || loading || disabledIcons}
        color="primary"
        sx={{ mr: 2 }}
      >
        {isRetreivingWordUserData
          ? <CircularSpinner size="small" color="primary" />
          : <DocxIcon fontSize="large" />}
      </IconButton>
      <IconButton
        onClick={saveEmployeePdfCvHandle}
        disabled={isRetreivingPdfUserData || loading || disabledIcons}
        sx={{ mr: 3 }}
      >
        {isRetreivingPdfUserData || loading
          ? <CircularSpinner size="small" color="primary" />
          : (
            <PdfIcon
              sx={{ fill: !disabledIcons ? theme.palette.error.main : 'Background.main' }}
              fontSize="large"
            />
          )}
      </IconButton>
    </>
  );
}

export default memo(ActionsSet);
