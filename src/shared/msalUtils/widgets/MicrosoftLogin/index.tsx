import { memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthError } from "@azure/msal-browser"
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "shared/utils/authConfig"
import { Text } from "shared/utils/constants"
import { msalInstance } from "shared/utils/interceptors"

import SnackBarUtils from "common/components/SnackBar/SnackBarUtils"
import MicrosoftIcon from "common/icons/MicrosoftIcon"

type StateLocation = {
  from?: { pathname?: string }
}

const MicrosoftLoginComponent = function (): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as StateLocation)?.from?.pathname || "/"

  const { logger } = useMsal()

  const handleLogin = async (): Promise<void> => {
    navigate({ pathname: "/" })
    try {
      await msalInstance.loginPopup(loginRequest)
      navigate(from, { replace: true })
    } catch (error) {
      if (error instanceof AuthError) {
        logger.error(error?.message)
        SnackBarUtils.error(error?.message)
      }
    }
  }

  return (
    <div className="flex w-full justify-center">
      <button onClick={handleLogin}>
        <MicrosoftIcon />
        <p>{Text.ButtonLogin}</p>
      </button>
    </div>
  )
}

export default memo(MicrosoftLoginComponent)
