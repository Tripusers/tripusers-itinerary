import { FaHeart } from "react-icons/fa";
import "./style.scss";
import Testimonial from "@/sanity/types/testimonials";
import { PortableText } from "@portabletext/react";
import OptImage from "@/components/commmon/OptImage";

type Props = {
  data: Testimonial[];
};

// Utility function to truncate PortableText to a specified word limit
const truncatePortableText = (blocks: any[], wordLimit: number): any[] => {
  // Convert PortableText blocks to plain text
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

  // Split into words
  const words = plainText.split(/\s+/);

  // If word count is less than or equal to the limit, return the original blocks
  if (words.length <= wordLimit) {
    return blocks;
  }

  // Get the first 100 words and join them with an ellipsis
  const truncatedText = words.slice(0, wordLimit).join(" ") + "...";

  // Return a new PortableText block containing the truncated text.
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
  // get random 4 objects from dare

  const randomTestimonials = data.sort(() => Math.random() - 0.5).slice(0, 4);

  const startDateFormatted = (date: Date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // create a const data with

  return (
    <section id="Testimonials">
      <div className="title">
        <FaHeart />
        <h2>heartening</h2>
      </div>
      <h3>Wanderlust Vibes</h3>
      <p>Our ecstatic customers share their inspiring stories</p>
      <div className="testimonials_container">
        {randomTestimonials.map((testimonial) => (
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
              <p>{testimonial.title}</p>
              <div className="review">
                <PortableText
                  value={truncatePortableText(testimonial.fullReview, 50)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
