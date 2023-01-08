import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const VerticalKebabIcon: React.FC<Props> = ({
  className,
  size,
  color,
}) => {
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
        <clipPath id="clip-VerticalKebab">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="VerticalKebab" clipPath="url(#clip-VerticalKebab)">
        <circle
          id="Ellipse_1"
          data-name="Ellipse 1"
          cx="6"
          cy="6"
          r="6"
          transform="translate(32) rotate(90)"
        />
        <circle
          id="Ellipse_2"
          data-name="Ellipse 2"
          cx="6"
          cy="6"
          r="6"
          transform="translate(32 20) rotate(90)"
        />
        <circle
          id="Ellipse_3"
          data-name="Ellipse 3"
          cx="6"
          cy="6"
          r="6"
          transform="translate(32 40) rotate(90)"
        />
      </g>
    </svg>
  );
};
