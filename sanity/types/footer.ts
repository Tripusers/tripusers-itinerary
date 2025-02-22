import { ImagePropsSanity } from "./imageProps";

export type bottomBanner = {
  headline: string;
  description: string;
  image: ImagePropsSanity;
};

export type footer = {
  _id: string;
  _createdAt: Date;
  title: string;
  location: string;
  locationSubtitle: string;
  phone: string;
  phoneSubtitle: string;
  email: string;
  emailSubtitle: string;
  facebook: string;
  instagram: string;
  twitter: string;
  bottomBanner: bottomBanner;
};
