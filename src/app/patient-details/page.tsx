"use client"; // Required for client-side logic like useState and useEffect

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function PatientDetailsPage() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay for backdrop */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Centered Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex items-center justify-center z-[100]">
            <motion.button
              key={`button-${active.title}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-4 right-4 bg-white rounded-full h-8 w-8 flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="w-full max-w-[500px] h-auto max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* Image Section */}
              <motion.div layoutId={`image-${active.title}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 object-cover sm:rounded-tr-lg sm:rounded-tl-lg"
                />
              </motion.div>

              {/* Details Section */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <motion.h3
                    layoutId={`title-${active.title}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}`}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <div className="pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Cards List */}
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}`}
            key={`card-${card.title}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover"
                />
              </motion.div>

              <div>
                <motion.h3
                  layoutId={`title-${card.title}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

const cards = [
  {
    description: "Diabetes Mellitus",
    title: "John Doe",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "View",
    ctaLink: "#",
    content: () => (
      <p>
        Diabetes Mellitus is a metabolic disorder characterized by high blood
        sugar levels. Proper medication, diet, and exercise can help manage
        this condition.
      </p>
    ),
  },
  {
    description: "Hypertension",
    title: "Alice Smith",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "View",
    ctaLink: "#",
    content: () => (
      <p>
        Hypertension increases the risk of heart attack, stroke, and other
        complications. Lifestyle modifications and medications are crucial.
      </p>
    ),
  },
  {
    description: "Asthma",
    title: "Michael Johnson",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "View",
    ctaLink: "#",
    content: () => (
      <p>
        Asthma is a chronic condition affecting the airways. Inhalers and
        medications can effectively control asthma symptoms.
      </p>
    ),
  },
  {
    description: "Allergy",
    title: "David Putra",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "View",
    ctaLink: "#",
    content: () => (
      <p>
        Allergy is a chronic condition affecting the airways. Inhalers and
        medications can effectively control asthma symptoms.
      </p>
    ),
  },
];
