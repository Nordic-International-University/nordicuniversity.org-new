import {ReactNode} from "react";

export interface accordionItemType {
    key: string;
    label: string;
    children: ReactNode;
}

export interface accordionProps {
    item: Array<accordionItemType>;
}

export interface aboutSliderProps {
    image: any;
    name: string;
    description: string;
}
