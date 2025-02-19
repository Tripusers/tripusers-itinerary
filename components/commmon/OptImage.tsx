import ImageSize from "@/utils/image-utils";
import { SanityImage } from "sanity-image";

type Props = {
  image: {
    asset: {
      _id: string;
      metadata: {
        lqip: string;
      };
    };
    hotspot?: {
      x: number;
      y: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  alt: string;
  className?: string;
  mode?: "contain" | "cover";
  sizes?: "banner" | "card" | "avatar";
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

const OptImage: React.FC<Props> = ({
  image,
  alt,
  className,
  mode = "cover",
  sizes = "banner",
  loading = "eager",
  width,
  height,
}) => {
  return (
    <SanityImage
      id={image.asset._id}
      baseUrl="https://cdn.sanity.io/images/mzm06ita/production/"
      alt={alt}
      hotspot={image.hotspot}
      crop={image.crop}
      className={className}
      style={{
        objectPosition: image.hotspot
          ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
          : undefined,
      }}
      mode={mode}
      sizes={`${ImageSize}.${sizes}`}
      loading={loading}
      preview={image.asset.metadata.lqip}
      width={width}
      height={height}
    />
  );
};

export default OptImage;
