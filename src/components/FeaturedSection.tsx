import React from "react";
import serviceData from "../data/health_checkups.json";
import Link from "next/link";
import { Button } from "./ui/moving-border";
import { BackgroundGradient } from "./ui/background-gradient";

interface Service{
        id: number,
        title: string,
        slug: string,
        description: string,
        price: number,
        doctor: string,
        isFeatured: boolean,
        
}

function FeaturedSection() {
    const featuredServices = serviceData.services.filter((service:Service) => service.isFeatured)

  return (
    <div className="py-12 bg-black">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            FEATURED
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Recover From The Best
          </p>
        </div>
      </div>
      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {featuredServices.map((service:Service)=>(
                <div key={service.id} className="flex justify-center">
                    <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                        <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                        <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{service.title}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{service.description}</p>
                        <Link href={`/services/${service.slug}`}>
                        Learn More
                        </Link>
                        </div>
                    </BackgroundGradient>
                </div>
            ))}

        </div>
      </div>
      <div className="mt-20 text-center">
        <Link href={"/checkups"}>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-500"
          >
            View All Facilities
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedSection;
