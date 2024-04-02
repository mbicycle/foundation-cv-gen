import { useNavigate } from 'react-router-dom';
import { Button } from '@mbicycle/foundation-ui-kit';

import { Typography } from '@mui/material';

const NOT_FOUND_PAGE_TEXT = 'The requested url does not exist';
const NOT_FOUND_BTN_TEXT = 'GO TO MAIN PAGE';

const NotFound = function (): JSX.Element {
  const navigate = useNavigate();
  const redirectCallback = (): void => {
    navigate('/');
  };
  return (
    <div className="m-auto p-20 rounded-lg border flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">{NOT_FOUND_PAGE_TEXT}</h2>
      <Button className="mt-4 mb-6 text-3lg font-bold" variant="empty" onClick={redirectCallback}>
        {NOT_FOUND_BTN_TEXT}
      </Button>
      <Typography variant="h1">404</Typography>
    </div>
  );
};

export default NotFound;
