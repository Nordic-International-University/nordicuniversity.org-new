export interface DoubleSliderTypes {
  title: string;
  name: string;
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
  url: {
    single: string;
    all: string;
  };
  direction: Direction;
  sliderName: string;
  reverseDirection: boolean;
  sectionTitle: string;
  delay: number;
}
