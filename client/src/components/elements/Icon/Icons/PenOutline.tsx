import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const PenOutlineIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
      fillOpacity={0}
    >
      <g clipPath="url(#clip0_246_398)">
        <path
          d="M28.8341 9.94133L36.391 2.38428L49.6157 15.6091L42.0588 23.1661M28.8341 9.94133L3.16683 35.6084C2.66578 36.1094 2.38428 36.7891 2.38428 37.4977V49.6157H14.5024C15.211 49.6157 15.8906 49.3344 16.3917 48.8331L42.0588 23.1661M28.8341 9.94133L42.0588 23.1661"
          stroke={color}
          strokeWidth="4.00773"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_246_398">
          <rect width="52" height="52" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
