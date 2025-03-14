"use client";

import React, { useState } from "react";
import { IconUpload, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/moving-border";

// Mock AI Model Prediction Function
async function predictSkinDisease(image: File): Promise<{
  isSkinImage: boolean;
  disease?: string;
  details?: {
    causes: string;
    remedies: string;
    doctor: string;
  };
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock Data for Testing
      const mockData = {
        eczema: {
          causes: "Dry skin, irritants, or stress.",
          remedies: "Use moisturizer, avoid irritants.",
          doctor: "Dr. Arvind Singh (Dermatologist)",
        },
        psoriasis: {
          causes: "Autoimmune condition, stress.",
          remedies: "Topical steroids, phototherapy.",
          doctor: "Dr. Neha Sharma (Skin Specialist)",
        },
        ringworm: {
          causes: "Fungal infection through contact.",
          remedies: "Antifungal creams, keep area dry.",
          doctor: "Dr. Ravi Das (Infection Specialist)",
        },
      };

      const randomResult = Math.random();

      // Mock AI Prediction Logic
      if (randomResult < 0.3) {
        resolve({
          isSkinImage: true,
          disease: "eczema",
          details: mockData["eczema"],
        });
      } else if (randomResult < 0.6) {
        resolve({
          isSkinImage: true,
          disease: "psoriasis",
          details: mockData["psoriasis"],
        });
      } else if (randomResult < 0.9) {
        resolve({
          isSkinImage: true,
          disease: "ringworm",
          details: mockData["ringworm"],
        });
      } else {
        resolve({ isSkinImage: false });
      }
    }, 1000); // Simulate AI Model Processing Delay
  });
}

export default function SkinTestPage() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    disease: string;
    details: { causes: string; remedies: string; doctor: string };
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setError(null);
      setResult(null); // Clear previous result
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("❌ Please upload an image of your skin.");
      return;
    }

    const prediction = await predictSkinDisease(image);

    if (!prediction.isSkinImage) {
      setError("❌ The uploaded image does not appear to be a skin image.");
      setResult(null);
    } else if (prediction.disease) {
      setResult({
        disease: prediction.disease,
        details: prediction.details!,
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Skin Disease Detection</h1>

      {/* File Upload Section */}
      <div className="border border-dashed p-6 rounded-lg bg-white dark:bg-black">
        <label className="flex items-center space-x-3 cursor-pointer">
          <IconUpload className="w-8 h-8 text-blue-500" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-sm text-gray-500">Upload your skin image</span>
        </label>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 flex items-center">
            <IconAlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Success Message */}
        {image && (
          <div className="mt-4 text-green-500 flex items-center">
            <IconCheck className="w-5 h-5 mr-2" />
            Image uploaded: {image.name}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button onClick={handleSubmit}>Proceed</Button>
      </div>

      {/* Disease Detection Results */}
      {result && (
        <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-2xl font-bold text-green-500">
            ✅ Detected Disease: {result.disease.toUpperCase()}
          </h2>
          <p className="mt-2">
            <strong>Causes:</strong> {result.details.causes}
          </p>
          <p>
            <strong>Remedies:</strong> {result.details.remedies}
          </p>
          <p>
            <strong>Recommended Doctor:</strong> {result.details.doctor}
          </p>
        </div>
      )}
    </div>
  );
}
