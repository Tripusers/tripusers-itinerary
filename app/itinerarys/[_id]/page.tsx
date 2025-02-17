"use client";

import ItineraryHero from "@/components/itinerary/ItineraryHero";
import PageLoading from "@/components/loader/PageLoading";
import {
  getAllItinerarys,
  getAllTestimonials,
  getItineraryById,
} from "@/sanity/sanity-utils";
import { Itinerary } from "@/sanity/types/itinerary";
import Testimonial from "@/sanity/types/testimonials";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{ _id: string }>;
};

const page = ({ params }: Props) => {
  const { _id: slug } = use(params);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [itineraryById, setItineraryById] = useState<Itinerary>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [testimonialsData, itinerary] = await Promise.all([
        getAllTestimonials(),
        getItineraryById(slug),
      ]);

      setTestimonials(testimonialsData);
      setItineraryById(itinerary);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (!loading && !itineraryById) {
    notFound();
  }

  if (loading || !testimonials) {
    return <PageLoading />;
  }

  //   console.log("testimonials: ", testimonials);
  //   console.log("allItinerarys: ", allItinerarys);
  console.log("itineraryById: ", itineraryById);

  return (
    <>
      <ItineraryHero
        hero_image={itineraryById && itineraryById.cardImage.asset.url}
        clientName={itineraryById && itineraryById.clientName}
        tripTo={itineraryById && itineraryById.tripTo}
        startDate={itineraryById && itineraryById.date}
        noOfAdults={itineraryById && itineraryById.adults}
        noOfChilderm={itineraryById && itineraryById.children}
        noOfInfants={itineraryById && itineraryById.infant}
      />
    </>
  );
};
export default page;
