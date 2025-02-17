"use client";

import PageLoading from "@/components/loader/PageLoading";
import { getItineraryById } from "@/sanity/sanity-utils";
import { Itinerary } from "@/sanity/types/itinerary";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

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

  return <section id="page">{itineraryById?.clientName}</section>;
};

export default page;
