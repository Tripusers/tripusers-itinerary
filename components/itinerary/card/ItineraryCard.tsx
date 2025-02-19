import { Moon, Sun } from "lucide-react";
import "./style.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiHotelFill, RiLandscapeFill } from "react-icons/ri";
import { FaCarAlt, FaPlane } from "react-icons/fa";
import { Itinerary } from "@/sanity/types/itinerary";
import OptImage from "@/components/commmon/OptImage";

type Props = {
  data: Itinerary | undefined;
};

const ItineraryCard = ({ data }: Props) => {
  const router = useRouter();

  return (
    <section id="itinerary_card">
      <Link href={`/itinerarys/${data?._id}/${data?._id}`}>
        <div className="top">
          <div className="img_container">
            {data?.cardImage.asset.url && (
              <OptImage image={data.cardImage} alt="itinerary card image" width={800} sizes="card" />
            )}
            {data?.deal && <p>{data.deal}</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="top_details_container">
            <div className="day_night_container">
              <p>
                {data?.days}D <Sun />
                {data?.nights && " | "}
                {data?.nights && data?.nights}
                {data?.nights && "N"}
                {data?.nights && <Moon />}
              </p>
            </div>
            <h1>{data?.itineraryTitle}</h1>
            <p>
              {data?.days}D {data?.tripTo}
            </p>
          </div>
          <div className="gap">
            <div className="ticket_card_circle c_top" />
            <div className="line" />
            <div className="ticket_card_circle c_bottom" />
          </div>

          <div className="bottom_bottom_container">
            <p className="price_container">
              <span className="price_actual">₹ {data?.priceActual}</span>{" "}
              <span className="price">₹ {data?.price}</span>
            </p>
            <div className="activities_container">
              {data?.isHotels && (
                <p>
                  <RiHotelFill />
                  Hotels
                </p>
              )}
              {data?.isFlight && (
                <p>
                  <FaPlane />
                  Flight
                </p>
              )}
              {data?.isTransfer && (
                <p>
                  <FaCarAlt />
                  Transfer
                </p>
              )}
              {data?.isSightseeing && (
                <p>
                  <RiLandscapeFill />
                  Sightseeing
                </p>
              )}
            </div>
            <button
              onClick={() =>
                router.push(`/itinerarys/${data?._id}/${data?._id}`)
              }
            >
              View Itinerary
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ItineraryCard;
