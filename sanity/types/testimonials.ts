import { PortableTextBlock } from "sanity";
import { ImagePropsSanity } from "./imageProps";

export type Testimonial = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: {
        current: string;
    };
    reviewDate: Date;
    tripTo: string;
    cardImage: ImagePropsSanity;
    profile: {
        name: string;
        image: ImagePropsSanity;
    };
    rating: string;
    shortReview: string;
    hashtags?: {
        name: string;
    }[];
    images: ImagePropsSanity[];
    fullReview: PortableTextBlock[];
};

export default Testimonial;
