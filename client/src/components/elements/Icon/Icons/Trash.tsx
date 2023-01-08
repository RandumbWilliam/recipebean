import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const TrashIcon: React.FC<Props> = ({ className, size, color }) => {
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
        <clipPath id="clip-Trash">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Trash" clipPath="url(#clip-Trash)">
        <path
          id="trash-solid"
          d="M13.731,1.8,13,3.25H3.25a3.25,3.25,0,0,0,0,6.5h39a3.25,3.25,0,0,0,0-6.5H32.5L31.769,1.8a3.237,3.237,0,0,0-2.9-1.8H16.636A3.237,3.237,0,0,0,13.731,1.8ZM42.25,13h-39L5.4,47.43A4.878,4.878,0,0,0,10.268,52H35.232A4.878,4.878,0,0,0,40.1,47.43Z"
          transform="translate(3.25)"
        />
      </g>
    </svg>
  );
};
