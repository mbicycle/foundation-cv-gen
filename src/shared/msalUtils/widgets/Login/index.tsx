import MicrosoftLoginComponent from "shared/msalUtils/widgets/MicrosoftLogin"
import { Text } from "shared/utils/constants"

import LogoColoredIcon from "common/icons/LogoColoredIcon"

const Login = function (): JSX.Element {
  return (
    <div className="m-auto h-full w-full self-center align-middle">
      <div className="flex flex-col items-center bg-white">
        <div className="flex w-full justify-center">
          <LogoColoredIcon className="size-8" />
        </div>
        <h6>{Text.CardTitle}</h6>
        <p>{Text.CardDescription}</p>
        <div>
          <MicrosoftLoginComponent />
        </div>
      </div>
    </div>
  )
}

export default Login
