import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const TrashAltIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.0625 0L38.9375 2.88889H49V8.66667H3V2.88889H13.0625L15.9375 0H36.0625ZM5.875 46.2222C5.875 49.4 8.4625 52 11.625 52H40.375C43.5375 52 46.125 49.4 46.125 46.2222V11.5556H5.875V46.2222ZM11.625 17.3333H40.375V46.2222H11.625V17.3333Z"
        fill={color}
      />
    </svg>
  );
};
