import { PortableTextBlock } from "sanity";
import { ImagePropsSanity } from "./imageProps";

export type contactUs = {
  _id: string;
  _createdAt: Date;
  title: string;
  subtitle: string;
  bannerImage: ImagePropsSanity;
  formInfo: string;
  Address: PortableTextBlock[];
  email: string;
  phone: string;

  ourOfficesSubtitle: string;
  offices: {
    place: string;
    Address: PortableTextBlock[];
  }[];
};
