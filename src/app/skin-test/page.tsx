"use client";

import React, { useState } from "react";
import { IconUpload, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/moving-border";
import axios from 'axios';

export default function SkinTestPage() {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

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

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('/api/analyze-image', formData);
            setResult(response.data.result || 'No condition detected.');
        } catch (error) {
            console.error('Error:', error);
            setError('❌ Error analyzing the image. Try again later.');
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
                    <span className="text-sm text-gray-500">
                        Upload your skin image
                    </span>
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
                        ✅ Detection Result
                    </h2>
                    <p className="mt-2">{result}</p>
                </div>
            )}
        </div>
    );
}
