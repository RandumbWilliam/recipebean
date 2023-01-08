import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const PenIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <defs>
        <clipPath id="clip-Pen">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Pen" clipPath="url(#clip-Pen)">
        <path
          id="pen_edit_icon_177296"
          d="M47.517,5.334a2.722,2.722,0,0,0-1.935.8L40.91,10.809,51.856,21.755l4.673-4.673a2.735,2.735,0,0,0,0-3.871L49.453,6.134a2.726,2.726,0,0,0-1.935-.8ZM36.805,14.914,5.333,46.386V57.332H16.279L47.751,25.86,36.805,14.914Z"
          transform="translate(-5.332 -5.332)"
        />
      </g>
    </svg>
  );
};
