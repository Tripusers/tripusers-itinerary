import { Check, Moon, Sun } from "lucide-react";
import "./style.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ItineraryCardProps = {
  cardImage?: string;
  deal?: string;
  days?: number;
  nights?: number;
  itineraryTitle?: string;
  tripTo?: string;
  priceActual?: number;
  price?: number;
  activities?: number;
  hotels?: number;
  _id?: string;
};

const ItineraryCard = ({
  cardImage,
  deal,
  days = 0,
  nights,
  itineraryTitle = "Itinerary Title",
  tripTo = "Paris",
  priceActual,
  price = 1500,
  activities,
  hotels,
  _id,
}: ItineraryCardProps) => {
  const router = useRouter();

  return (
    <section id="itinerary_card">
      <Link href={`/itinerarys/${_id}/${_id}`}>
        <div className="top">
          <div className="img_container">
            <img src={cardImage} alt="itinerary card image" />
            {deal && <p>{deal}</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="top_details_container">
            <div className="day_night_container">
              <p>
                {days}D <Sun />
                {nights && " | "}
                {nights && nights}
                {nights && "N"}
                {nights && <Moon />}
              </p>
            </div>
            <h1>{itineraryTitle}</h1>
            <p>
              {days}D {tripTo}
            </p>
          </div>
          <div className="gap">
            <div className="ticket_card_circle c_top" />
            <div className="line" />
            <div className="ticket_card_circle c_bottom" />
          </div>

          <div className="bottom_bottom_container">
            <p className="price_container">
              <span className="price_actual">₹ {priceActual}</span>{" "}
              <span className="price">₹ {price}</span>
            </p>
            <div className="activities_container">
              {activities && (
                <p>
                  <Check />
                  {activities} Activities
                </p>
              )}
              {hotels && (
                <p>
                  <Check />
                  {hotels} Hotels
                </p>
              )}
            </div>
            <button onClick={() => router.push(`/itinerarys/${_id}/${_id}`)}>
              View Itinerary
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ItineraryCard;
