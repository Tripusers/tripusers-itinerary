"use client";

import PageLoading from "@/components/loader/PageLoading";
import { getItineraryById } from "@/sanity/sanity-utils";
import { Itinerary } from "@/sanity/types/itinerary";
import { Suspense, use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import "./style.scss";
import Hero from "@/components/itinerary/itineraryById/hero/Hero";
import ItineraryByDay from "@/components/itinerary/itineraryById/itineraryByDay/ItineraryByDay";

type Props = {
  params: Promise<{ itineraryId: string }>;
};

const page = ({ params }: Props) => {
  const { itineraryId: slug } = use(params);

  const [itineraryById, setItineraryById] = useState<Itinerary>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const itinerary = await getItineraryById(slug);
      setItineraryById(itinerary);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!loading && !itineraryById) {
    notFound();
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero data={itineraryById} />
      </Suspense>
      {/*  <Acccordion
        titles={itineraryById?.itinerary.map((item) => item.title)}
        day={itineraryById?.itinerary.map((item) => item.day)}
      >
        {itineraryById?.itinerary.map((item, i) => (
          <div key={i}>
            {item.day} {item.date}
          </div>
        ))}
      </Acccordion> */}
      <Suspense fallback={<div>Loading...</div>}>
        <ItineraryByDay data={itineraryById} />
      </Suspense>
      {/* <PdfGenerator data={itineraryById} /> */}
    </>
  );
};

export default page;
