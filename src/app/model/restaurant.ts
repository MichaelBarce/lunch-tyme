import { Location } from './location';
import { Contact } from './contact';

export interface Restaurant {
    name: string;
    backgroundImageURL: string;
    category: string;
    contact: Contact;
    location: Location;
}
