import BreakfastImage from "@assets/cookbooks/Breakfast.png";
import DessertImage from "@assets/cookbooks/Dessert.png";
import DinnerImage from "@assets/cookbooks/Dinner.png";
import LunchImage from "@assets/cookbooks/Lunch.png";
import SoupImage from "@assets/cookbooks/Soup.png";

export const CookbookCover = [
  { id: "0", name: "breakfast", src: BreakfastImage.src },
  { id: "1", name: "dessert", src: DessertImage.src },
  { id: "2", name: "dinner", src: DinnerImage.src },
  { id: "3", name: "lunch", src: LunchImage.src },
  { id: "4", name: "soup", src: SoupImage.src },
];

export const CookbookCoverId: { [key: string]: string } = {
  "0": BreakfastImage.src,
  "1": DessertImage.src,
  "2": DinnerImage.src,
  "3": LunchImage.src,
  "4": SoupImage.src,
};
