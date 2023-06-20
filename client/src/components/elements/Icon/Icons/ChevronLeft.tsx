import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const ChevronLeftIcon: React.FC<Props> = ({
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
      <g clipPath="url(#clip0_271_402)">
        <g clipPath="url(#clip1_271_402)">
          <path
            d="M42.1586 5.40311C41.8539 4.53983 41.3156 3.85936 39.6703 2.26483C37.9742 0.619513 37.4867 0.30467 36.3289 0.0913884C35.4656 -0.0711117 34.4805 0.0710758 33.6883 0.46717C33.2617 0.680451 30.9562 2.93514 21.907 11.964C15.7219 18.1492 10.5016 23.4406 10.3187 23.7148C9.84141 24.4359 9.64844 25.0961 9.64844 26C9.64844 26.8937 9.84141 27.5539 10.3187 28.2851C10.4914 28.5695 15.6914 33.8406 21.8969 40.0359C30.9664 49.0851 33.2617 51.3195 33.6883 51.5328C34.8664 52.1219 36.3492 52.1117 37.5781 51.5125C38.3398 51.1367 41.5086 48.0187 41.8641 47.2773C42.4734 46.0484 42.5141 44.657 41.9961 43.4687C41.7219 42.8492 41.2547 42.3515 33.3227 34.4094L24.9336 26L33.3227 17.6008C41.2344 9.66873 41.7219 9.15076 41.9961 8.53123C42.382 7.66795 42.4531 6.24608 42.1586 5.40311Z"
            fill={color}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_271_402">
          <rect width="52" height="52" fill="white" />
        </clipPath>
        <clipPath id="clip1_271_402">
          <rect
            width="52"
            height="52"
            fill="white"
            transform="translate(52) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
