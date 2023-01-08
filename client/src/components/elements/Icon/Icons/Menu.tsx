import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const MenuIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <defs>
        <clipPath id="clip-Menu">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Menu" clipPath="url(#clip-Menu)">
        <rect
          id="Rectangle_1"
          data-name="Rectangle 1"
          width="52"
          height="8"
          rx="4"
          transform="translate(0 22)"
        />
        <rect
          id="Rectangle_2"
          data-name="Rectangle 2"
          width="52"
          height="8"
          rx="4"
          transform="translate(0 7)"
        />
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width="52"
          height="8"
          rx="4"
          transform="translate(0 37)"
        />
      </g>
    </svg>
  );
};
