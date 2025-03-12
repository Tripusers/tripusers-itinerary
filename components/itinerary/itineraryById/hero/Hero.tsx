import { Itinerary } from "@/sanity/types/itinerary";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useResponsive from "@/hooks/useResponsive";
import ImageFadeSlider from "@/components/ui/Slider/ImageFadeSlider";

const Hero = ({ data }: { data?: Itinerary }) => {
  const { isMobile } = useResponsive();
  if (!data)
    return (
      <section id="Hero">
        <p>no data found</p>
      </section>
    );

  //console.log("data->", data);

  const client = `${data.clientName}`;
  const tripTo = `${data.tripTo}`;

  return (
    <section id="Hero">
      <div className="title_container">
        <h1>
          <span
            className={`client_name ${isMobile && client.length > 10 ? `length-${client.length}` : ""}`}
          >
            {client}'s
          </span>
          <span
            className={`place_name ${isMobile && tripTo.length > 7 ? `length-${tripTo.length}` : ""}`}
          >
            {tripTo}
          </span>
          <span className="duration_trip">
            <span className="duration">
              {" "}
              {`${data.days} Days | ${data.nights} Nights`}
            </span>
            <span className="trip">Trip</span>
          </span>
        </h1>
      </div>
      <ImageFadeSlider images={data.coverImages} />
    </section>
  );
};

export default Hero;
