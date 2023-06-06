import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const MinusIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <rect y="19" width="52" height="14" rx="3.18864" fill={color} />
    </svg>
  );
};
