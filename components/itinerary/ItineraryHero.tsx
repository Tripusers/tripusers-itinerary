import { CalendarDays } from "lucide-react";
import "./styles.scss";

type ItineraryHeroProps = {
  hero_image: string | undefined;
  clientName: string | undefined;
  tripTo: string | undefined;
  startDate: string | undefined;
  noOfAdults: number | undefined;
  noOfChilderm: number | undefined;
  noOfInfants: number | undefined;
};

const ItineraryHero = ({
  hero_image,
  clientName = "John",
  tripTo = "Paris",
  startDate = "2024-01-01",
  noOfAdults = 2,
  noOfChilderm = 1,
  noOfInfants = 1,
}: ItineraryHeroProps) => {
  const startDateFormatted = new Date(startDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section id="itinerary_hero">
      <div className="dark_fade" />
      {hero_image && (
        <img id="hero_image" src={hero_image} alt="itinerary hero image" />
      )}
      <div className="hero_content">
        <h1>{clientName}'s Trip To</h1>
        <h2>{tripTo}</h2>
        <div className="date_container">
          <CalendarDays strokeWidth={1.6} />
          <p>
            <span>{startDateFormatted}</span>|
            <span>
              {noOfAdults} Adults{noOfChilderm && ","}
            </span>
            {noOfChilderm && (
              <span>
                {noOfChilderm} Children{noOfInfants && ","}
              </span>
            )}
            {noOfInfants && <span>{noOfInfants} Infants</span>}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ItineraryHero;
