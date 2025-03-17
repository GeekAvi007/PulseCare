"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/moving-border";

// Types for state management
interface Answers {
  mood: string;
  sleep: string;
  social: string;
  stress: string;
  thoughts: string;
}

export default function MentalHealthPage() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({
    mood: "",
    sleep: "",
    social: "",
    stress: "",
    thoughts: "",
  });

  // Function to handle answer updates
  const handleInputChange = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Result Analysis Logic
  const analyzeResults = (): string => {
    const { mood, sleep, social, stress, thoughts } = answers;

    if (
      mood === "Unhappy" &&
      sleep === "Poor" &&
      social === "Isolated" &&
      stress === "High"
    ) {
      return "⚠️ You may be experiencing signs of anxiety or depression. Please consider seeking support from loved ones or a mental health professional.";
    }

    if (
      mood === "Neutral" &&
      sleep === "Average" &&
      social === "Balanced" &&
      stress === "Moderate"
    ) {
      return "😊 Your mental health seems stable, but regular self-care practices will help you maintain it.";
    }

    return "🎯 You're in a positive mental state! Keep following your healthy habits and stay mindful.";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Detection</h1>

      {step === 1 && (
        <StepOne answers={answers} handleInputChange={handleInputChange} />
      )}

      {step === 2 && (
        <StepTwo answers={answers} handleInputChange={handleInputChange} />
      )}

      {step === 3 && (
        <StepThree answers={answers} handleInputChange={handleInputChange} />
      )}

      {step === 4 && (
        <div className="mt-8 p-6 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-2xl font-bold mb-4">🔍 Analysis Results</h2>
          <p className="text-lg text-black dark:text-neutral-400">
            {analyzeResults()}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center space-x-4">
        {step > 1 && (
          <Button onClick={() => setStep((prev) => prev - 1)}>Back</Button>
        )}
        {step < 4 ? (
          <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
        ) : (
          <Button onClick={() => setStep(1)}>Restart Test</Button>
        )}
      </div>
    </div>
  );
}

// Step One Component
interface StepProps {
  answers: Answers;
  handleInputChange: (field: keyof Answers, value: string) => void;
}

function StepOne({ answers, handleInputChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">🧠 How have you been feeling lately?</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => handleInputChange("mood", "Happy")}
          className={answers.mood === "Happy" ? "bg-green-500" : ""}
        >
          😊 Happy
        </Button>
        <Button
          onClick={() => handleInputChange("mood", "Neutral")}
          className={answers.mood === "Neutral" ? "bg-yellow-500" : ""}
        >
          😐 Neutral
        </Button>
        <Button
          onClick={() => handleInputChange("mood", "Unhappy")}
          className={answers.mood === "Unhappy" ? "bg-red-500" : ""}
        >
          😔 Unhappy
        </Button>
      </div>
    </div>
  );
}

// Step Two Component
function StepTwo({ answers, handleInputChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">💤 How’s your sleep pattern?</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => handleInputChange("sleep", "Good")}
          className={answers.sleep === "Good" ? "bg-green-500" : ""}
        >
          😴 Good
        </Button>
        <Button
          onClick={() => handleInputChange("sleep", "Average")}
          className={answers.sleep === "Average" ? "bg-yellow-500" : ""}
        >
          😌 Average
        </Button>
        <Button
          onClick={() => handleInputChange("sleep", "Poor")}
          className={answers.sleep === "Poor" ? "bg-red-500" : ""}
        >
          😵 Poor
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-6">🤝 How socially active have you been?</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => handleInputChange("social", "Balanced")}
          className={answers.social === "Balanced" ? "bg-green-500" : ""}
        >
          👫 Balanced
        </Button>
        <Button
          onClick={() => handleInputChange("social", "Isolated")}
          className={answers.social === "Isolated" ? "bg-red-500" : ""}
        >
          😶 Isolated
        </Button>
      </div>
    </div>
  );
}

// Step Three Component
function StepThree({ answers, handleInputChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">📝 Describe your recent thoughts in a few lines:</h2>
      <textarea
        value={answers.thoughts}
        onChange={(e) => handleInputChange("thoughts", e.target.value)}
        rows={4}
        placeholder="Write your thoughts here..."
        className="w-full p-4 rounded-lg border dark:bg-neutral-900"
      />
    </div>
  );
}
