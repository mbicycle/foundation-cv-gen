import type { SVGProps } from "react"
import { memo } from "react"

const CircleIcon = function (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
    </svg>
  )
}

export default memo(CircleIcon)
