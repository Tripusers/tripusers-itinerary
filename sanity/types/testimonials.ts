import { PortableTextBlock } from "sanity";

export type Testimonial = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: {
        current: string;
    };
    reviewDate: Date;
    tripTo: string;
    cardImage: {
        asset: {
            url: string;
        };
        hotspot: {
            height: number;
            width: number;
            x: number;
            y: number;
        };
        crop: {
            right: number;
            top: number;
            left: number;
            bottom: number;
        };
    };
    profile: {
        name: string;
        image: string;
    };
    rating: string;
    shortReview: string;
    hashtags?: {
        name: string;
    }[];
    images: {
        _id: string;
        url: string;
        hotspot: {
            height: number;
            width: number;
            x: number;
            y: number;
        };
        crop: {
            right: number;
            top: number;
            left: number;
            bottom: number;
        };
    }[];
    fullReview: PortableTextBlock[];
};

export default Testimonial;
