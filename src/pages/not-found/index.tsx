import { useNavigate } from "react-router-dom"

import { Button } from "@mbicycle/foundation-ui-kit"

const NOT_FOUND_PAGE_TEXT = "The requested url does not exist"
const NOT_FOUND_BTN_TEXT = "GO TO MAIN PAGE"

const NotFound = function (): JSX.Element {
  const navigate = useNavigate()
  const redirectCallback = (): void => {
    navigate("/")
  }
  return (
    <div className="m-auto flex flex-col items-center justify-center rounded-lg border p-20">
      <h2 className="text-4xl font-bold">{NOT_FOUND_PAGE_TEXT}</h2>
      <Button className="text-3lg mb-6 mt-4 font-bold" variant="empty" onClick={redirectCallback}>
        {NOT_FOUND_BTN_TEXT}
      </Button>
      <h1 className="text-5xl font-bold">404</h1>
    </div>
  )
}

export default NotFound
