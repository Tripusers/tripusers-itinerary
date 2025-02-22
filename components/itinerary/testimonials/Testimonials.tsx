import { FaHeart } from "react-icons/fa";
import "./style.scss";
import Testimonial from "@/sanity/types/testimonials";
import { PortableText } from "@portabletext/react";
import OptImage from "@/components/commmon/OptImage";
import Link from "next/link";
import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";

type Props = {
  data: Testimonial[];
};

const truncatePortableText = (blocks: any[], wordLimit: number): any[] => {
  const plainText = blocks
    .reduce((acc, block) => {
      if (block._type === "block" && block.children) {
        const blockText = block.children
          .map((child: any) => child.text)
          .join("");
        return acc + " " + blockText;
      }
      return acc;
    }, "")
    .trim();

  const words = plainText.split(/\s+/);

  if (words.length <= wordLimit) {
    return blocks;
  }

  const truncatedText = words.slice(0, wordLimit).join(" ") + "...";

  return [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: truncatedText,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
};

const Testimonials = ({ data }: Props) => {
  const { isMobile } = useResponsive();
  const [visibleData, setVisibleData] = useState(4);

  const startDateFormatted = (date: Date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleLoadMore = () => {
    setVisibleData((prevVisibleData) =>
      Math.min(prevVisibleData + 4, data.length)
    );
  };

  return (
    <section id="Testimonials">
      <div className="title">
        <FaHeart />
        <h2>heartening</h2>
      </div>
      <h3>Wanderlust Vibes</h3>
      <p>Our ecstatic customers share their inspiring stories</p>
      <div className="testimonials_container">
        {data.slice(0, visibleData).map((testimonial) => {
          return (
            <div className="testimonial_card" key={testimonial._id}>
              <div className="title_container">
                <OptImage
                  image={testimonial.profile.image}
                  alt="testimonial profile image"
                  width={100}
                  size="avatar"
                />
                <div className="right">
                  <h4>{testimonial.profile.name}</h4>
                  <p>{startDateFormatted(testimonial.reviewDate)}</p>
                </div>
              </div>
              <div className="content_container">
                <h4>{testimonial.title}</h4>
                <div className="review">
                  <PortableText
                    value={truncatePortableText(
                      testimonial.fullReview,
                      isMobile ? 40 : 60
                    )}
                  />
                </div>
                <div className="review_images">
                  {testimonial.images &&
                    testimonial.images.length > 0 &&
                    testimonial.images.slice(0, 6).map((image, i) => (
                      <div
                        className="img_container"
                        key={`${image.asset._id}-${i}`}
                      >
                        <OptImage image={image} alt="review image" />
                      </div>
                    ))}
                </div>
              </div>
              <Link
                href={`https://www.tripusers.com/testimonials/${testimonial.slug}`}
              >
                Read Full Story
              </Link>
            </div>
          );
        })}
      </div>
      {visibleData < data.length && (
        <button className="load_more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default Testimonials;
