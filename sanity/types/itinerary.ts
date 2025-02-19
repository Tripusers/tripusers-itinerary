import { ImagePropsSanity } from "./imageProps";
import { PortableTextBlock } from "sanity";


export type Itinerary = {
    _id: string;
    _createdAt: string;
    title: string;
    clientName: string;
    clientNumber?: string;
    tripTo: string;
    date: string;
    deal?: string;
    adults?: number;
    children?: number;
    infant?: number;
    cardImage: ImagePropsSanity;
    days: number;
    nights?: number;
    itineraryTitle: string;
    isHotels?: boolean;
    isFlight?: boolean;
    isTransfer?: boolean;
    isSightseeing?: boolean;
    price: number;
    priceActual: number;
    coverImages: ImagePropsSanity[];
    placeImages: ImagePropsSanity[];
    inclusion: PortableTextBlock[];
    itinerary: {
        title: string;
        day: number;
        date: string;
        description: PortableTextBlock[];
        activaties: {
            title: string;
            duration?: string;
            ticketIncluded?: boolean;
            images: ImagePropsSanity[];
            description?: PortableTextBlock[];
            experiences?: {
                title: string;
                images: {
                    image: ImagePropsSanity;
                    caption?: string;
                }[];
            };
        }[];
        stay: {
            title: string;
            startsAt: number;
            endsAt: number;
            endDate: string;
            duration: number;
            isNight: boolean;
            stayDetails: {
                title: string;
                subTitle: string;
                rooms: {
                    room: string;
                    roomDetails: string;
                }[];
                inclusions?: {
                    isBreakfastIncluded?: boolean;
                    isLunchIncluded?: boolean;
                    isDinnerIncluded?: boolean;
                };

            };

        };
    };
    exclusion: PortableTextBlock[];
    notes: PortableTextBlock[];
    fareBreakup: {
        perAdult: number;
        perChild: number;
        perInfant: number;
        tax: number;
        taxAmount: number;
    };
};
