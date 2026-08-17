import type { Blessing } from "../data/weddingData";

const API_URL = import.meta.env.VITE_API_URL || "https://prabin-sneha-wedding-invitation-backend.onrender.com";

interface ApiBlessing {
  _id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface BlessingsResponse {
  success: boolean;
  count?: number;
  blessings: ApiBlessing[];
  message?: string;
}

interface CreateBlessingResponse {
  success: boolean;
  message: string;
  blessing: ApiBlessing;
}

const avatarColors = [
  "bg-[#936492]",
  "bg-[#754474]",
  "bg-[#5c355b]",
  "bg-[#b78bb6]",
  "bg-[#a67c1e]",
];

const getRandomAvatarBg = () => {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const mapBlessing = (blessing: ApiBlessing): Blessing => {
  return {
    id: blessing._id,
    name: blessing.name,
    relation: blessing.relationship,
    message: blessing.message,
    date: formatDate(blessing.createdAt),
    avatarBg: getRandomAvatarBg(),
  };
};

export const getBlessings = async (
  relationship?: string,
  search?: string
): Promise<Blessing[]> => {
  const params = new URLSearchParams();

  if (relationship && relationship !== "All") {
    params.append("relationship", relationship);
  }

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/api/blessings${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blessings");
  }

  const data: BlessingsResponse = await response.json();

  return data.blessings.map(mapBlessing);
};

export const getLatestBlessings = async (): Promise<Blessing[]> => {
  const response = await fetch(`${API_URL}/api/blessings/latest`);

  if (!response.ok) {
    throw new Error("Failed to fetch latest blessings");
  }

  const data: BlessingsResponse = await response.json();

  return data.blessings.map(mapBlessing);
};

export const createBlessing = async (data: {
  name: string;
  relationship: string;
  message: string;
}): Promise<Blessing> => {
  const response = await fetch(`${API_URL}/api/blessings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: CreateBlessingResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit blessing");
  }

  return mapBlessing(result.blessing);
};