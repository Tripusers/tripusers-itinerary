"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./style.scss";

interface AccordionProps {
  children?: React.ReactNode[];
  titles?: string[];
  dayPrefix?: string;
  day?: number[];
  initialOpenIndex?: number[];
}

const AccordionItem = memo(
  ({
    index,
    title,
    isOpen,
    dayPrefix,
    day,
    onToggle,
    children,
  }: {
    index: number;
    title: string;
    isOpen: boolean;
    dayPrefix?: string;
    day?: number;
    onToggle: (index: number) => void;
    children: React.ReactNode;
  }) => (
    <li className="accordion_child" key={`accordion-child${index}`}>
      <button
        className={`accordion_title ${isOpen ? "accordion_active" : ""}`}
        onClick={() => onToggle(index)}
        id={`accordion-title-${index}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
      >
        <div className="day_container">
          {dayPrefix && <div className="prefix">{dayPrefix}</div>}
          {day !== undefined && <div className="day">{day}</div>}
        </div>
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeInOut" },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2, ease: "easeIn" },
              },
            }}
            id={`accordion-content-${index}`}
            className={`accordion_content ${isOpen ? "accordion_content_open" : ""}`}
            role="region"
            aria-labelledby={`accordion-title-${index}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
);

AccordionItem.displayName = "AccordionItem";

const Accordion = ({
  children = [],
  titles = [],
  dayPrefix = "Day",
  day = [],
  initialOpenIndex = [0],
}: AccordionProps) => {
  const [openAccordionIndex, setOpenAccordionIndex] =
    useState<number[]>(initialOpenIndex);

  const handleClick = useCallback((index: number) => {
    setOpenAccordionIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const handleOpenAll = useCallback(() => {
    const allIndices = Array.from({ length: children.length }, (_, i) => i);
    setOpenAccordionIndex(allIndices);
  }, [children.length]);

  const handleCloseAll = useCallback(() => {
    setOpenAccordionIndex([]);
  }, []);

  const isAllOpen = openAccordionIndex.length === children.length;

  return (
    <div id="Acccordion" role="presentation">
      <div className="accordion_controls">
        <button
          onClick={isAllOpen ? handleCloseAll : handleOpenAll}
          className="accordion_control_btn"
          aria-label={isAllOpen ? "Close all sections" : "Open all sections"}
        >
          {isAllOpen ? "Close All" : "Open All"}
        </button>
      </div>
      <ul className="accordion_container" role="list">
        {children.map((child, i) => (
          <AccordionItem
            key={i}
            index={i}
            title={titles[i] || `Section ${i + 1}`}
            isOpen={openAccordionIndex.includes(i)}
            dayPrefix={dayPrefix}
            day={day[i]}
            onToggle={handleClick}
          >
            {child}
          </AccordionItem>
        ))}
      </ul>
    </div>
  );
};

export default memo(Accordion);
