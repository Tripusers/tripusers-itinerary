import { Crop, Hotspot } from "./types";
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
    cardImage: {
        asset: {
            url: string;
        };
        hotspot: Hotspot;
        crop: Crop;
    };
    days: number;
    nights?: number;
    itineraryTitle: string;
    activities?: number;
    hotels?: number;
    price: number;
    priceActual: number;
    coverImages: {
        _id: string;
        url: string;
        hotspot: Hotspot;
        crop: Crop;
    }[];
    placeImages: {
        _id: string;
        url: string;
        hotspot: Hotspot;
        crop: Crop;
    }[];
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
            images: {
                _id: string;
                url: string;
                hotspot: Hotspot;
                crop: Crop;
            }[];
            description?: PortableTextBlock[];
            experiences?: {
                title: string;
                images: {
                    image: {
                        _id: string;
                        url: string;
                        hotspot: Hotspot;
                        crop: Crop;
                    };
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
