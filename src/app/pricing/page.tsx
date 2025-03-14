"use client";

import React from "react";
import { Lock } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function PricingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 grid">Pricing Page</h1>
      <GlowingEffectDemo />
    </div>
  );
}

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GridItem
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="You should buy PulseCare Pro"
        description="It's the best money you'll ever spend." price= "Rs 199"     />

      <GridItem
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Unlock Premium Features"
        description="Exclusive facilities to elevate your Health."
        price= "Rs 299"
      />

      <GridItem
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Advanced Security Features"
        description="Stay protected with top-notch encryption."
        price="Rs 399"
      />
    </ul>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  price: string
}

const GridItem = ({ icon, title, description, price }: GridItemProps) => {
  return (
    <li className="min-h-[24rem] list-none flex mt-10">
      <div className="relative flex flex-col flex-grow rounded-2.5xl border p-4 md:rounded-3xl md:p-6">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-xl border-0.75 p-8 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem] text-black dark:text-neutral-400"
              >
                {description}
              </h2>
              <h1
                className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white"
              >
                {price}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
