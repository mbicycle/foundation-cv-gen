/* eslint-disable max-len */
import type { SVGProps } from "react"
import { memo } from "react"

const PersonIcon = function (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 37 45">
      <path d="M33.2714 36.3252L25.239 32.2701C24.2014 31.7462 23.5455 30.6747 23.5455 29.503V26.3208C23.7708 26.0618 24.0298 25.7281 24.3056 25.3342C25.4005 23.7736 26.228 22.0559 26.8023 20.2534C27.8324 19.9333 28.5909 18.9722 28.5909 17.8302V14.434C28.5909 13.6868 28.2621 13.0186 27.75 12.5516V7.64151C27.75 7.64151 28.7482 0 18.5 0C8.251 0 9.25 7.64151 9.25 7.64151V12.5516C8.73789 13.0186 8.40909 13.6868 8.40909 14.434V17.8302C8.40909 18.7251 8.87495 19.5122 9.57207 19.9673C10.4121 23.6624 12.6136 26.3208 12.6136 26.3208V29.4241C12.6136 30.5558 12.0015 31.5976 11.0167 32.1393L3.515 36.2717C1.34798 37.4646 0 39.7579 0 42.2499V45H37V42.4163C37 39.8369 35.5562 37.4791 33.2714 36.3252Z" />
    </svg>
  )
}

export default memo(PersonIcon)