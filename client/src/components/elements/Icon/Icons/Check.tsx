import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const CheckIcon: React.FC<Props> = ({ className, size, color }) => {
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
        d="M45.0609 5.91988C44.8864 5.98221 44.5498 6.11933 44.313 6.23152C44.0761 6.35617 38.0554 12.2648 30.9376 19.37L18.011 32.2967L13.0498 27.3479C9.65919 23.9698 7.9265 22.3243 7.54008 22.1249C6.69243 21.7011 5.3337 21.6512 4.3614 22.0252C3.72567 22.262 3.40157 22.5238 2.10516 23.8077C0.310147 25.6152 0.0234434 26.1014 0.010978 27.4975C-0.0139528 29.2925 -0.475172 28.7316 8.46252 37.7066C13.8974 43.1665 16.6149 45.7967 16.9514 45.9587C17.5872 46.2579 18.4348 46.2579 19.0706 45.9587C19.4196 45.7967 24.4805 40.8105 35.5374 29.7288C53.3629 11.8783 51.9917 13.3867 51.9667 11.5418C51.9543 10.1457 51.6676 9.6595 49.8726 7.85202C48.6011 6.58055 48.2521 6.30631 47.6412 6.08193C46.9058 5.80769 45.6966 5.7329 45.0609 5.91988Z"
        fill={color}
      />
    </svg>
  );
};
