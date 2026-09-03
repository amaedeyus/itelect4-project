import type {
  ApiLostFoundItem,
  Claim,
} from "../types";

const API_URL = "http://localhost:3001";

export async function createClaim(
  claim: Omit<Claim, "id">
): Promise<Claim> {
  const response = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claim),
  });

  if (!response.ok) {
    throw new Error("Failed to create claim");
  }

  return response.json();
}

export async function fetchItems(): Promise<ApiLostFoundItem[]> {
  const response = await fetch(`${API_URL}/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
}

export async function fetchItemById(
  id: string
): Promise<ApiLostFoundItem> {
  const response = await fetch(`${API_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  return response.json();
}

export async function fetchClaims(): Promise<Claim[]> {
  const response = await fetch(`${API_URL}/claims`);

  if (!response.ok) {
    throw new Error("Failed to fetch claims");
  }

  return response.json();
}