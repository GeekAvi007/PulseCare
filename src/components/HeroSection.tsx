"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/moving-border";
import { Spotlight } from "./ui/spotlight-new";

function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <div className="p-4 relative z-10 w-full text-center">
        <Spotlight />
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 sm:mt-3">
          Your Health, Our Mission!
        </h1>

        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Your health, your way — whether it's tracking vitals, connecting with
          doctors, or managing emergencies, we're here to make healthcare
          simple, smart, and accessible for everyone!
        </p>

        <div className="mt-4">
          <Link href={"/explore"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-500"
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
