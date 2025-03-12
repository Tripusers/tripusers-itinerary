import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OptImage from "@/components/commmon/OptImage";
import { ImagePropsSanity } from "@/sanity/types/imageProps";
import { useState } from "react";

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

interface ImageSliderProps {
  images: ImagePropsSanity[];
  settings?: {
    fade?: boolean;
    infinite?: boolean;
    autoplay?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplaySpeed?: number;
    cssEase?: string;
    pauseOnHover?: boolean;
    dots?: boolean;
  };
}

const ImageFadeSlider = ({
  images,
  settings = {},
  index = false,
}: ImageSliderProps & { index?: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSettings = {
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
    afterChange: (current: number) => setCurrentSlide(current),
    ...settings,
  };

  return (
    <div className="slider-container">
      <Slider {...defaultSettings}>
        {images.map((image, i) => (
          <div key={`${image.asset._id}-${i}`} className="img_container">
            <OptImage image={image} alt="slider image" />
          </div>
        ))}
      </Slider>
      {index && (
        <p className="img_no">
          {currentSlide + 1} / {images.length}
        </p>
      )}
    </div>
  );
};

export default ImageFadeSlider;
