import { Itinerary } from "@/sanity/types/itinerary";
import "./style.scss";
import Slider, { CustomArrowProps } from "react-slick";
import OptImage from "@/components/commmon/OptImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useResponsive from "@/hooks/useResponsive";

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

const Hero = ({ data }: { data?: Itinerary }) => {
  const { isMobile } = useResponsive();
  if (!data)
    return (
      <section id="Hero">
        <p>no data found</p>
      </section>
    );

  //console.log("data->", data);

  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    pauseOnHover: false,
  };

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
      <div className="slider-container">
        <Slider {...settings}>
          {data.coverImages.map((image, i) => (
            <div key={`${image.asset._id}-${i}`} className="img_container">
              <OptImage image={image} alt="cover image" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
