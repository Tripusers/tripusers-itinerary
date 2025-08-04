"use client";

import { memo, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import "./style.scss";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import useResponsive from "@/hooks/useResponsive";

interface AccordionProps {
  children?: React.ReactNode[];
  initialOpenIndex?: number[];
  buttonContent?: React.ReactNode[];
  isOpen?: number[];
  onOpenChange?: (openIndices: number[]) => void;
  showAllBtn?: boolean;
  initialOpen?: boolean;
  className?: string;
}

interface AccordionItemProps {
  index?: number;
  isOpen?: boolean;
  onToggle?: (index: number) => void;
  children: React.ReactNode;
  buttonContent?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem = memo(
  ({
    index = 0,
    isOpen: controlledIsOpen,
    onToggle,
    children,
    buttonContent,
    defaultOpen = false,
    className,
  }: AccordionItemProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const isItemOpen = controlledIsOpen ?? internalIsOpen;

    const handleToggle = useCallback(() => {
      if (onToggle && typeof index === "number") {
        onToggle(index);
      } else {
        setInternalIsOpen(!internalIsOpen);
      }
    }, [onToggle, index, internalIsOpen]);

    return (
      <div className={className}>
        <button
          className={`accordion_title ${isItemOpen ? "accordion_active" : ""}`}
          onClick={handleToggle}
          id={`accordion-title-${index}`}
          aria-expanded={isItemOpen}
          aria-controls={`accordion-content-${index}`}
        >
          {buttonContent}
        </button>
        <AnimatePresence initial={false}>
          {isItemOpen && (
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
              className={`accordion_content ${isItemOpen ? "accordion_content_open" : ""}`}
              role="region"
              aria-labelledby={`accordion-title-${index}`}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

const Accordion = ({
  children = [],
  initialOpenIndex = [0],
  buttonContent = [],
  isOpen,
  onOpenChange,
  showAllBtn = false,
  initialOpen = true,
  className,
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

  return (
    <div id="Acccordion" role="presentation">
      <div className="accordion_container" role="list">
        {children.map((child, i) => (
          <AccordionItem
            key={i}
            index={i}
            isOpen={openAccordionIndex.includes(i)}
            onToggle={handleClick}
            buttonContent={buttonContent[i]}
            className={className}
          >
            {child}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Accordion);
