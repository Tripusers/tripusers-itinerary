import Testimonial from "./types/testimonials";
import { createClient, groq } from "next-sanity";
import { config } from "./config/client-config";
import { Itinerary } from "./types/itinerary";
import { brand } from "./types/brant";
import { heroInfo } from "./types/heroInfo";
import { contactUs } from "./types/contact";
import { footer } from "./types/footer";

//* ---------------------> Brand
export async function getBrand(): Promise<brand[]> {
  return createClient(config).fetch(
    groq`*[_type == "brand"] {
      _id,
      _createdAt,
      name,
      "headerImage": headerImage.asset->url,
      "darkImage": darkImage.asset->url,
      "lightImage": lightImage.asset->url,
      "logoMark": logoMark.asset->url
    }`
  );
}

export async function getHeroInfo(): Promise<heroInfo[]> {
  return createClient(config).fetch(
    groq`*[_type == "heroInfo"] | order(_createdAt asc) {
      _id,
      _createdAt,
      subtitle,
      title,
      "icon": icon.asset->url,
    }`
  );
}

//* ---------------------> Testimonials

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return createClient(config).fetch(
    groq`*[_type == "testimonials"] | order(_createdAt asc){
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            reviewDate,
            tripTo,
            "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
            "profile": profile {
                name,
                "image": image{asset->{url, _id, metadata}, hotspot, crop},
            },
            rating,
            shortReview,
            fullReview,
            "images": images[] {
                asset->{_id, url, metadata},
                hotspot,
                crop,
            },
            "hashtags": hashtags[] {
                name,
            },
        }`
  );
}

//* ---------------------> Itinerary

export async function getAllItinerarys(): Promise<Itinerary[]> {
  return createClient(config).fetch(
    groq`*[_type == "clientItinerarys"] {
          _id,
          _createdAt,
          title,
          clientName,
          clientNumber,
          tripTo,
          date,
          deal,
          adults,
          children,
          infant,
          "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
          days,
          nights,
          itineraryTitle,
          activities,
          hotels,
          price,
          priceActual,
          "coverImages": coverImages[] {
            "_id": asset->_id,
            "url": asset->url,
            hotspot,
            crop,
          },
          "placeImages": placeImages[] {
            "_id": asset->_id,
            "url": asset->url,
            "metadata": asset->metadata,
            hotspot,
            crop,
          },
          inclusion,
          "itinerary": itinerary[] {
            title,
            day,
            date,
            description,
            "activaties": activaties[] {
              title,
              duration,
              ticketIncluded,
              "images": images[] {
                "_id": asset->_id,
                "url": asset->url,
                hotspot,
                crop,
              },
              description,
              experiences {
                title,
                "images": images[] {
                  "image": image{asset->{url, _id, metadata}, hotspot, crop},
                  caption,
                }
              }
            },
            stay {
              title,
              startsAt,
              endsAt,
              endDate,
              duration,
              isNight,
              stayDetails {
                title,
                subTitle,
                "rooms": rooms[] {
                  room,
                  roomDetails,
                },
                inclusions {
                  isBreakfastIncluded,
                  isLunchIncluded,
                  isDinnerIncluded,
                }
              }
            }
          },
          exclusion,
          notes,
          fareBreakup {
            perAdult,
            perChild,
            perInfant,
            tax,
            taxAmount,
          }
        }`
  );
}

//* ---------------------> Itinerary by id

export async function getItineraryById(
  itineraryId: string
): Promise<Itinerary> {
  return createClient(config).fetch(
    groq`*[_type == "clientItinerarys" && _id == $itineraryId][0] {
          _id,
          _createdAt,
          title,
          clientName,
          tripTo,
          date,
          deal,
          adults,
          children,
          infant,
          "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
          days,
          nights,
          itineraryTitle,
          isHotels,
          isFlight,
          isTransfer,
          isSightseeing,
          price,
          priceActual,
          "coverImages": coverImages[] {
            "asset":{
              "_id": asset->_id,
              "url": asset->url,
              "metadata": asset->metadata,
            },
            hotspot,
            crop,
          },
          "placeImages": placeImages[] {
            "_id": asset->_id,
            "url": asset->url,
            "metadata": asset->metadata,
            hotspot,
            crop,
          },
          inclusion,
          "itinerary": itinerary[] {
            title,
            day,
            date,
            description,
            "activaties": activaties[] {
              title,
              duration,
              ticketIncluded,
              "images": images[] {
                "_id": asset->_id,
                "url": asset->url,
                "metadata": asset->metadata,
                hotspot,
                crop,
              },
              description,
              experiences {
                title,
                "images": images[] {
                  "image": image{asset->{url, _id, metadata}, hotspot, crop},
                  caption,
                }
              }
            },
            stay {
              title,
              startsAt,
              endsAt,
              endDate,
              duration,
              isNight,
              stayDetails {
                title,
                subTitle,
                "rooms": rooms[] {
                  room,
                  roomDetails,
                },
                inclusions {
                  isBreakfastIncluded,
                  isLunchIncluded,
                  isDinnerIncluded,
                }
              }
            }
          },
          exclusion,
          notes,
          fareBreakup {
            perAdult,
            perChild,
            perInfant,
            tax,
            taxAmount,
          }
        }`,
    { itineraryId }
  );
}

//* ---------------------> Itinerary Hero by id

export async function getItineraryHeroById(
  itineraryId: string
): Promise<Itinerary> {
  return createClient(config).fetch(
    groq`*[_type == "clientItinerarys" && _id == $itineraryId][0] {
      _id,
      _createdAt,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      clientName,
      tripTo,
      date,
      adults,
      children,
      infant,
    }`,
    { itineraryId }
  );
}

//* ---------------------> Itinerary Card by id

export async function getItineraryCardById(
  itineraryId: string
): Promise<Itinerary> {
  return createClient(config).fetch(
    groq`*[_type == "clientItinerarys" && _id == $itineraryId][0] {
      _id,
      _createdAt,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      deal,
      days,
      nights,
      itineraryTitle,
      tripTo,
      price,
      priceActual,
      isHotels,
      isFlight,
      isTransfer,
      isSightseeing,
    }`
  );
}


//* ---------------------> contact us

export async function getContactUsInfo(): Promise<contactUs> {
  return createClient(config).fetch(
    groq`*[_type == "contactUs"][0]{
     _id,
      _createdAt,
      title,
      subtitle,
      "bannerImage":bannerImage{asset->{_id, url, metadata}, hotspot, crop},
      formInfo,
      Address,
      email,
      phone,
      ourOfficesSubtitle,
      "offices":offices[]{
        "Address":Address,
        "place":place
      }
    }`
  );
}

//* ---------------------> footer

export async function getFooter(): Promise<footer> {
  return createClient(config).fetch(
    groq`*[_type == 'footer'][0]{
      _id,
      _createdAt,
      title,
      location,
      locationSubtitle,
      phone,
      phoneSubtitle,
      email,
      emailSubtitle,
      facebook,
      instagram,
      twitter,
    }`
  );
}