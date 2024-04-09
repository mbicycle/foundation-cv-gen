import MicrosoftLoginComponent from 'shared/msalUtils/widgets/MicrosoftLogin';
import { Text } from 'shared/utils/constants';

import LogoColoredIcon from 'common/icons/LogoColoredIcon';

const Login = function (): JSX.Element {
  return (
    <div className="w-full h-full m-auto self-center align-middle">
      <div className="bg-white flex flex-col items-center">
        <div className="w-full flex justify-center">
          <LogoColoredIcon className="size-8" />
        </div>
        <h6>{Text.CardTitle}</h6>
        <p>{Text.CardDescription}</p>
        <div>
          <MicrosoftLoginComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
