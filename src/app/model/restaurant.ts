import { Location } from "./location";

export interface Restaurant {
    name: string;
    backgroundImageURL: string;
    category: string;
    contact: string;
    location: Location;
}
