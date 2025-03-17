"use client";

import React, { useState, useEffect } from "react";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/moving-border";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

type Language = 'en' | 'hi' | 'bn';

const descriptions: Record<Language, string> = {
    en: "Ensure the ECG nodes are properly placed on your chest, wrists, and ankles as shown in the guide.",
    hi: "सुनिश्चित करें कि ECG नोड्स को आपके सीने, कलाई और टखनों पर मार्गदर्शिका में दिखाए गए अनुसार सही ढंग से रखा गया है।",
    bn: "নিশ্চিত করুন যে ECG নোডগুলি আপনার বুক, কব্জি এবং গোড়ালির উপর নির্দেশিকায় দেখানো অনুযায়ী সঠিকভাবে স্থাপন করা হয়েছে।"
};

export default function ECGTestPage() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [ecgData, setEcgData] = useState<number[]>([]);
    const [recordedData, setRecordedData] = useState<number[]>([]);
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setEcgData((prevData) => [...prevData.slice(-49), Math.random() * 2 + 1]);
            }, 200);
        } else {
            setEcgData([]); 
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleECG = () => setIsRunning((prev) => !prev);

    const recordECG = () => {
        if (!isRunning) {
            setRecordedData([...ecgData]);
        }
    };

    const data = {
        labels: Array.from({ length: ecgData.length }, (_, i) => i.toString()),
        datasets: [{
            label: "ECG Signal",
            data: ecgData,
            borderColor: "#34D399",
            backgroundColor: "rgba(52, 211, 153, 0.2)",
            borderWidth: 2,
            tension: 0.3,
        }]
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">ECG Testing</h1>

            {/* ECG Graph Section */}
            <div className="border border-dashed p-6 rounded-lg bg-white dark:bg-black">
                <Line data={data} />
                <div className="mt-4 space-x-4">
                    <Button onClick={toggleECG}>{isRunning ? "Stop ECG" : "Start ECG"}</Button>
                    <Button onClick={recordECG} disabled={isRunning}>Record ECG</Button>
                </div>
            </div>

            {/* Node Placement Guide */}
            <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-black">
                <h2 className="text-2xl font-bold mb-2">ECG Node Placement Guide</h2>
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6g7DQUb3wtFZPxMj2rOxqmW3qBBC9p13jg&s" 
                    alt="ECG Node Placement Guide" 
                    className="rounded-lg mb-4"
                />
                <div className="mb-4">
                    <label className="text-sm font-bold">Choose Language:</label>
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="ml-2 border border-gray-300 rounded-md p-1"
                    >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="bn">বাংলা</option>
                    </select>
                </div>
                <p className="mt-4 text-gray-700">{descriptions[language]}</p>
            </div>
        </div>
    );
}