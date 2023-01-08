import React from "react";
import {
  BasketIcon,
  CookbookIcon,
  HeartIcon,
  MenuIcon,
  UtensilsIcon,
  CloseOutlineIcon,
  StopwatchIcon,
  HeartOutlineIcon,
  PenIcon,
  AddCookbookIcon,
  HorizontalKebabIcon,
  VerticalKebabIcon,
  TrashIcon,
  WarningIcon,
  CameraIcon,
  IngredientIcon,
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
