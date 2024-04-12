/* eslint-disable max-len */
import type { SVGProps } from "react"
import { memo } from "react"

const RectangleIcon = function (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 37 16">
      <rect x="0.0541992" width="36.6733" height="16" rx="2" fill="#E2E6EF" />
    </svg>
  )
}

export default memo(RectangleIcon)
