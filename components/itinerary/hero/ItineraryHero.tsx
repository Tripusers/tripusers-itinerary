import { CalendarDays } from "lucide-react";
import "./styles.scss";
import { Itinerary } from "@/sanity/types/itinerary";

type Props = {
  data: Itinerary | undefined;
};

const ItineraryHero = ({ data }: Props) => {
  if (!data) return null;

  const startDateFormatted = new Date(data.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section id="itinerary_hero">
      <div className="dark_fade" />
      {data.cardImage.asset.url && (
        <img
          id="hero_image"
          src={data.cardImage.asset.url}
          alt="itinerary hero image"
        />
      )}
      <div className="hero_content">
        <h1>{data.clientName}'s Trip To</h1>
        <h2>{data.tripTo}</h2>
        <div className="date_container">
          <CalendarDays strokeWidth={1.6} />
          <p>
            <span>{startDateFormatted}</span>|
            <span>
              {data.adults} Adults{data.children && ","}
            </span>
            {data.children && (
              <span>
                {data.children} Children{data.infant && ","}
              </span>
            )}
            {data.infant && <span>{data.infant} Infants</span>}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ItineraryHero;
