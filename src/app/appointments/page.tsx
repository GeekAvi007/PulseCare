"use client";

import React, { useState, useEffect } from "react";

const initialData = [
  { id: "1", amount: 316, status: "success", email: "ken99@example.com", disease: "Eczema" },
  { id: "2", amount: 242, status: "success", email: "Abe45@example.com", disease: "Rhintis" },
  { id: "3", amount: 837, status: "processing", email: "Monserrat44@example.com", disease: "COVID" },
  { id: "4", amount: 874, status: "success", email: "Silas22@example.com", disease: "Chest Pain" },
  { id: "5", amount: 721, status: "withdrawn", email: "carmella@example.com", disease: "Eczema" },
];

export default function DataTableDemo() {
  const [filter, setFilter] = useState("");
  const [patients, setPatients] = useState(initialData);
  const [newPatientEmail, setNewPatientEmail] = useState("");
  const [newDisease, setNewDisease] = useState("");

  // Load data from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("patientsData");
      if (savedData) {
        setPatients(JSON.parse(savedData));
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("patientsData", JSON.stringify(patients));
    }
  }, [patients]);

  const handleAddPatient = () => {
    const newPatient = {
      id: (patients.length + 1).toString(),
      amount: Math.floor(Math.random() * 1000),
      status: "Pending",
      email: newPatientEmail || "newpatient@example.com",
      disease: newDisease || "General Checkup",
    };

    setPatients([...patients, newPatient]);
    setNewPatientEmail("");
    setNewDisease("");
  };

  const filteredData = patients.filter((item) =>
    item.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <input
        type="text"
        placeholder="Filter emails..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded p-2 w-full mt-12"
      />
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Disease</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border">{row.status}</td>
                <td className="p-2 border">{row.email}</td>
                <td className="p-2 border">Rs. {row.amount.toFixed(2)}</td>
                <td className="p-2 border">{row.disease}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-2">
        <input
          type="email"
          placeholder="Enter new patient email"
          value={newPatientEmail}
          onChange={(e) => setNewPatientEmail(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <input
          type="text"
          placeholder="Enter Disease"
          value={newDisease}
          onChange={(e) => setNewDisease(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <button
          onClick={handleAddPatient}
          className="bg-green-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
