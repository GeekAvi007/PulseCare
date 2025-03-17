"use client";

import React from "react";
import { Button } from "@/components/ui/moving-border";

export default function ParkinsonsDetectionPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🧠 Parkinson's Disease Detection</h1>

      <div className="mt-6 p-6 border rounded-lg bg-white dark:bg-black text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          🚨 Coming Soon, We are working on it!
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-300 mb-8">
          Our team is dedicated to ensuring accurate analysis and results. Stay tuned for updates.
        </p>

        <h2 className="text-xl font-semibold mb-4">🎥 Watch This Informative Video</h2>
        <video
          controls
          className="w-full rounded-lg border"
          src="/loom-video (1).mp4"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={() => window.location.href = "/"}>Back to Home</Button>
      </div>
    </div>
  );
}
