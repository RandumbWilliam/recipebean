import React from "react";
import {
  AddCookbookIcon,
  BasketIcon,
  CloseOutlineIcon,
  CookbookIcon,
  CrossIcon,
  ErrorIcon,
  GoogleIcon,
  HamburgerIcon,
  HeartIcon,
  HeartOutlineIcon,
  HorizontalKebabIcon,
  IngredientIcon,
  PenIcon,
  PhotoIcon,
  PlusIcon,
  SearchIcon,
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
  Hamburger: HamburgerIcon,
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
  Photo: PhotoIcon,
  Ingredient: IngredientIcon,
  Error: ErrorIcon,
  Cross: CrossIcon,
  Google: GoogleIcon,
  Search: SearchIcon,
  Plus: PlusIcon,
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
