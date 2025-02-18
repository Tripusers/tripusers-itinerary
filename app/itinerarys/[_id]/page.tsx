"use client";

import ItineraryCard from "@/components/itinerary/card/ItineraryCard";
import ItineraryHero from "@/components/itinerary/hero/ItineraryHero";
import HeroInfo from "@/components/itinerary/heroInfo/HeroInfo";
import Testimonials from "@/components/itinerary/testimonials/Testimonials";
import PageLoading from "@/components/loader/PageLoading";
import {
  getAllTestimonials,
  getHeroInfo,
  getItineraryById,
  getItineraryHeroById,
} from "@/sanity/sanity-utils";
import { heroInfo } from "@/sanity/types/heroInfo";
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
  const [heroInfo, setHeroInfo] = useState<heroInfo[]>([]);
  const [itineraryHero, setItineraryHero] = useState<Itinerary>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [testimonialsData, itinerary, heroInfo, itineraryHero] =
        await Promise.all([
          getAllTestimonials(),
          getItineraryById(slug),
          getHeroInfo(),
          getItineraryHeroById(slug),
        ]);

      setTestimonials(testimonialsData);
      setItineraryById(itinerary);
      setHeroInfo(heroInfo);
      setItineraryHero(itineraryHero);
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

  console.log("testimonials: ", testimonials);
  //console.log("allItinerarys: ", allItinerarys);
  console.log("itineraryById: ", itineraryById);
  console.log("heroInfo: ", heroInfo);
  console.log("itineraryHero: ", itineraryHero);

  return (
    <>
      <ItineraryHero data={itineraryHero} />
      <ItineraryCard data={itineraryById} />
      <HeroInfo dataInfo={heroInfo} />
      <Testimonials data={testimonials} />
    </>
  );
};
export default page;
