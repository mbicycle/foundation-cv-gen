import type { SVGProps } from 'react';
import { memo } from 'react';

const RectangleBlueIcon = function (props: SVGProps<SVGSVGElement>):JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 38 16"
    >
      <rect x="0.987793" width="36.6733" height="16" rx="2" fill="#2A57E0" />
    </svg>
  );
};

export default memo(RectangleBlueIcon);
