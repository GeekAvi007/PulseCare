"use client";

import React, { useState } from "react";
import { IconUpload, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/moving-border";

// Mock AI Model Prediction Function
async function predictBrainTumor(image: File): Promise<{
  isBrainScan: boolean;
  tumorType?: string;
  details?: {
    symptoms: string;
    treatments: string;
    doctor: string;
  };
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        benign: {
          symptoms: "Headaches, vision issues, dizziness.",
          treatments: "Surgical removal, radiation therapy.",
          doctor: "Dr. Rajesh Verma (Neurosurgeon)",
        },
        malignant: {
          symptoms: "Seizures, memory loss, personality changes.",
          treatments: "Chemotherapy, radiation, surgery.",
          doctor: "Dr. Priya Mehta (Oncologist)",
        },
      };

      const randomResult = Math.random();

      if (randomResult < 0.4) {
        resolve({
          isBrainScan: true,
          tumorType: "benign",
          details: mockData["benign"],
        });
      } else if (randomResult < 0.8) {
        resolve({
          isBrainScan: true,
          tumorType: "malignant",
          details: mockData["malignant"],
        });
      } else {
        resolve({ isBrainScan: false });
      }
    }, 2000);
  });
}

export default function BrainTumorTestPage() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    tumorType: string;
    details: { symptoms: string; treatments: string; doctor: string };
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("❌ Please upload a valid brain scan image.");
      return;
    }

    const prediction = await predictBrainTumor(image);

    if (!prediction.isBrainScan) {
      setError("❌ The uploaded image does not appear to be a brain scan.");
      setResult(null);
    } else if (prediction.tumorType) {
      setResult({
        tumorType: prediction.tumorType,
        details: prediction.details!,
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Brain Tumor Detection</h1>

      <div className="border border-dashed p-6 rounded-lg bg-white dark:bg-black">
        <label className="flex items-center space-x-3 cursor-pointer">
          <IconUpload className="w-8 h-8 text-blue-500" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-sm text-gray-500">Upload your brain scan image</span>
        </label>

        {error && (
          <div className="mt-4 text-red-500 flex items-center">
            <IconAlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {image && (
          <div className="mt-4 text-green-500 flex items-center">
            <IconCheck className="w-5 h-5 mr-2" />
            Image uploaded: {image.name}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button onClick={handleSubmit}>Proceed</Button>
      </div>

      {result && (
        <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-2xl font-bold text-green-500">
            ✅ Tumor Type: {result.tumorType.toUpperCase()}
          </h2>
          <p className="mt-2">
            <strong>Symptoms:</strong> {result.details.symptoms}
          </p>
          <p>
            <strong>Treatment Options:</strong> {result.details.treatments}
          </p>
          <p>
            <strong>Recommended Doctor:</strong> {result.details.doctor}
          </p>
        </div>
      )}
    </div>
  );
}
