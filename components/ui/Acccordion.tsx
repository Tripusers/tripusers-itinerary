"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./style.scss";
import CalendarIcon from "../Icons/CalendarIcon";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children?: React.ReactNode[];
  titles?: string[];
  dayPrefix?: string;
  day?: number[];
  date?: string;
  initialOpenIndex?: number[];
  buttonContent?: React.ReactNode[];
  isOpen?: number[];
  onOpenChange?: (openIndices: number[]) => void;
  showAllBtn?: boolean;
  initialOpen?: boolean;
}

const getIncrementedDate = (baseDate: string, increment: number): string => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + increment);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const AccordionItem = memo(
  ({
    index,
    title,
    isOpen,
    dayPrefix,
    day,
    date,
    onToggle,
    children,
    buttonContent,
  }: {
    index: number;
    title: string;
    isOpen: boolean;
    dayPrefix?: string;
    day?: number;
    date?: string;
    onToggle: (index: number) => void;
    children: React.ReactNode;
    buttonContent?: React.ReactNode;
  }) => (
    <li className="accordion_child" key={`accordion-child${index}`}>
      <button
        className={`accordion_title ${isOpen ? "accordion_active" : ""}`}
        onClick={() => onToggle(index)}
        id={`accordion-title-${index}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
      >
        {buttonContent || (
          <>
            <div className="calendar">
              <CalendarIcon />
              <div className="day_container">
                {dayPrefix && <div className="prefix">{dayPrefix}</div>}
                {day !== undefined && (
                  <div className="day">{String(day).padStart(2, "0")}</div>
                )}
              </div>
            </div>
            <h4>
              <span>{date && getIncrementedDate(date, index)}</span>
              <span>{title}</span>
            </h4>
            <div
              className="arrow"
              style={{
                transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <ChevronDown strokeWidth={2.5} />
            </div>
          </>
        )}
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
  date,
  initialOpenIndex = [0],
  buttonContent = [],
  isOpen,
  onOpenChange,
  showAllBtn = false,
  initialOpen = true,
}: AccordionProps) => {
  const [internalOpenIndex, setInternalOpenIndex] = useState<number[]>(
    initialOpen ? initialOpenIndex : []
  );

  const openAccordionIndex = isOpen ?? internalOpenIndex;

  const handleClick = useCallback(
    (index: number) => {
      const newOpenState = openAccordionIndex.includes(index)
        ? openAccordionIndex.filter((i) => i !== index)
        : [...openAccordionIndex, index];

      onOpenChange?.(newOpenState);
      if (!isOpen) {
        setInternalOpenIndex(newOpenState);
      }
    },
    [openAccordionIndex, onOpenChange, isOpen]
  );

  const handleOpenAll = useCallback(() => {
    const allIndices = Array.from({ length: children.length }, (_, i) => i);
    onOpenChange?.(allIndices);
    if (!isOpen) {
      setInternalOpenIndex(allIndices);
    }
  }, [children.length, onOpenChange, isOpen]);

  const handleCloseAll = useCallback(() => {
    onOpenChange?.([]);
    if (!isOpen) {
      setInternalOpenIndex([]);
    }
  }, [onOpenChange, isOpen]);

  const isAllOpen = openAccordionIndex.length === children.length;

  return (
    <div id="Acccordion" role="presentation">
      {showAllBtn && (
        <div className="accordion_controls">
          <button
            onClick={isAllOpen ? handleCloseAll : handleOpenAll}
            className="accordion_control_btn"
            aria-label={isAllOpen ? "Close all sections" : "Open all sections"}
          >
            {isAllOpen ? "Close All" : "Open All"}
          </button>
        </div>
      )}
      <ul className="accordion_container" role="list">
        {children.map((child, i) => (
          <AccordionItem
            key={i}
            index={i}
            title={titles[i] || `Section ${i + 1}`}
            isOpen={openAccordionIndex.includes(i)}
            dayPrefix={dayPrefix}
            day={day[i]}
            date={date}
            onToggle={handleClick}
            buttonContent={buttonContent[i]}
          >
            {child}
          </AccordionItem>
        ))}
      </ul>
    </div>
  );
};

export default memo(Accordion);
