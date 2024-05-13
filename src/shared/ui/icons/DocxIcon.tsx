/* eslint-disable max-len */
import type { SVGProps } from "react"
import { memo } from "react"

const DocxIcon = function (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50">
      <path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 44 13 L 44 15 L 32 15 L 32 20 L 44 20 L 44 22 L 32 22 L 32 27 L 44 27 L 44 29 L 32 29 L 32 35 L 44 35 L 44 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 4.625 15.65625 L 8.1875 15.65625 L 10.21875 28.09375 C 10.308594 28.621094 10.367188 29.355469 10.40625 30.25 L 10.46875 30.25 C 10.496094 29.582031 10.613281 28.855469 10.78125 28.0625 L 13.40625 15.65625 L 16.90625 15.65625 L 19.28125 28.21875 C 19.367188 28.679688 19.433594 29.339844 19.5 30.21875 L 19.53125 30.21875 C 19.558594 29.53125 19.632813 28.828125 19.75 28.125 L 21.75 15.65625 L 25.0625 15.65625 L 21.21875 34.34375 L 17.59375 34.34375 L 15.1875 22.375 C 15.058594 21.75 14.996094 21.023438 14.96875 20.25 L 14.9375 20.25 C 14.875 21.101563 14.769531 21.824219 14.65625 22.375 L 12.1875 34.34375 L 8.4375 34.34375 Z" />
    </svg>
  )
}

export default memo(DocxIcon)