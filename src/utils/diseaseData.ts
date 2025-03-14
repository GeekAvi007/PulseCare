
export type DiseaseType = "eczema" | "psoriasis" | "ringworm";

export const diseaseData: Record<DiseaseType, { 
  causes: string; 
  remedies: string; 
  doctor: string; 
}> = {
  eczema: {
    causes: "Allergens, irritants, or genetics.",
    remedies: "Moisturizers, corticosteroid creams.",
    doctor: "Dr. Aryan Gupta (Dermatologist)",
  },
  psoriasis: {
    causes: "Immune system dysfunction, stress.",
    remedies: "Topical treatments, phototherapy.",
    doctor: "Dr. Neha Sharma (Skin Specialist)",
  },
  ringworm: {
    causes: "Fungal infection, poor hygiene.",
    remedies: "Antifungal creams, hygiene practices.",
    doctor: "Dr. Ravi Singh (Dermatologist)",
  },
};
