import React from "react";
import {
  AddCookbookIcon,
  BasketIcon,
  CameraIcon,
  CloseOutlineIcon,
  CookbookIcon,
  CrossIcon,
  ErrorIcon,
  GoogleIcon,
  HeartIcon,
  HeartOutlineIcon,
  HorizontalKebabIcon,
  IngredientIcon,
  MenuIcon,
  PenIcon,
  StopwatchIcon,
  TrashIcon,
  UtensilsIcon,
  VerticalKebabIcon,
  WarningIcon,
} from "./Icons";

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  color?: string;
}

export const Icons = {
  Basket: BasketIcon,
  Cookbook: CookbookIcon,
  Heart: HeartIcon,
  Menu: MenuIcon,
  Utensils: UtensilsIcon,
  CloseOutline: CloseOutlineIcon,
  Stopwatch: StopwatchIcon,
  HeartOutline: HeartOutlineIcon,
  Pen: PenIcon,
  AddCookbook: AddCookbookIcon,
  HorizontalKebab: HorizontalKebabIcon,
  VerticalKebab: VerticalKebabIcon,
  Trash: TrashIcon,
  Warning: WarningIcon,
  Camera: CameraIcon,
  Ingredient: IngredientIcon,
  Error: ErrorIcon,
  Cross: CrossIcon,
  Google: GoogleIcon,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = "",
  color = "#000",
}) => {
  const IconComponent = Icons[name];

  return <IconComponent className={className} size={size} color={color} />;
};

export default Icon;
