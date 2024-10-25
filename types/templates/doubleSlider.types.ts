export interface DoubleSliderTypes {
  title: string;
  description: string;
  slug?: string;
  date: string;
  image: any;
}

export enum Direction {
  horizontal = "horizontal",
  vertical = "vertical",
}

export interface doubleSliderProps {
  props: DoubleSliderTypes[];
  direction: Direction;
  reverseDirection: boolean;
  delay: number;
}
