
"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

function ChooseUs() {
  return (
    <div className="flex flex-col overflow-hidden">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            What We Offer<br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              To Your Best!
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={`/image.webp`}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-top justify-center"
        draggable={true}
      />
    </ContainerScroll>
  </div>
  )
}

export default ChooseUs