"use client";
import Image from "next/image";
import "./style.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import ImageSize from "@/utils/image-utils";

const logoAnim = "https://i.postimg.cc/X7gKtr09/logo-anim-once.gif";

const travelAnim = "https://i.postimg.cc/0NNq7K9n/travel-anim-loop.gif";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "नमस्ते",
  "Hello",
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 4500);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;

    const timeoutId = setTimeout(() => {
      setIndex(index + 1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <section id="loader">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="loader-container"
          >
            <div className="img-container">
              <Image
                src={logoAnim}
                alt="loading animation"
                fill
                sizes={ImageSize.cardSize}
                fetchPriority="high"
              />
            </div>
            <div className="travel-container">
              <Image
                src={travelAnim}
                alt="loading animation"
                fill
                sizes={ImageSize.cardSize}
                fetchPriority="high"
              />
            </div>
            <motion.p variants={opacity} initial="initial" animate="enter">
              <span></span>
              {words[index]}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Loader;
