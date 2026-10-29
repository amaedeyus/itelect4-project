import type {
  AiReply,
  ApiLostFoundItem,
  User,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured.");
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
  user: User;
}

interface ApiError {
  message?: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as ApiError;

    throw new Error(
      error.message ?? `Request failed (${response.status})`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  return request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginUser(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function fetchItems(): Promise<ApiLostFoundItem[]> {
  return request<ApiLostFoundItem[]>("/api/lost-found-items");
}

export function fetchItemById(
  id: string
): Promise<ApiLostFoundItem> {
  return request<ApiLostFoundItem>(
    `/api/lost-found-items/${encodeURIComponent(id)}`
  );
}

export function createItem(
  data: {
    title: string;
    description: string;
    type: "lost" | "found";
  },
  token: string
): Promise<ApiLostFoundItem> {
  return request<ApiLostFoundItem>(
    "/api/lost-found-items",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  );
}


export function askAi(
  prompt: string,
  token: string
): Promise<AiReply> {
  return request<AiReply>(
    "/api/ai",
    {
      method: "POST",
      body: JSON.stringify({ prompt }),
    },
    token
  );
}
