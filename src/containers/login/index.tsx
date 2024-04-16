import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { CONFIG } from "shared/config/envConfig"

import { Button } from "@mbicycle/foundation-ui-kit"

const Login = function (): JSX.Element {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(CONFIG.entryPoint)
  }

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center overflow-x-auto bg-white">
      <h2 className="mb-10 text-2xl font-semibold">You are unauthenticated</h2>
      <Button onClick={handleClick} variant="transparent">
        ← Back to Foundation
      </Button>
    </div>
  )
}

export default memo(Login)
