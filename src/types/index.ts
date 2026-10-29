
/* ===== ENUMS ===== */

export enum Role {
  Student = "student",
  SecurityAdmin = "security_admin",
}

export enum ClaimStatus {
  Pending = "pending",
  Verified = "verified",
  Rejected = "rejected",
}

/* ===== ID TYPES ===== */

// MongoDB document IDs and references are represented as strings
// in the frontend API types.
export type ID = string;

/* ===== USER ===== */

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

/* ===== LOST AND FOUND ITEMS ===== */

export interface LostFoundItem {
  id: ID;
  title: string;
  description: string;
  type: "lost" | "found";
  reporterId: ID;
  createdAt: Date;
}

// The API serializes dates to strings in JSON.
export type ApiLostFoundItem = Omit<
  LostFoundItem,
  "createdAt"
> & {
  createdAt: string;
};

/* ===== CLAIMS ===== */

export interface Claim {
  id: ID;
  itemId: ID;
  claimantId: ID;
  status: ClaimStatus;
  notes?: string;
}

/* ===== GENERIC INTERFACE ===== */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/* ===== UTILITY TYPES ===== */

export type ItemUpdate = Partial<
  Pick<LostFoundItem, "title" | "description" | "type">
>;

export type ItemPreview = Pick<
  LostFoundItem,
  "id" | "title" | "type"
>;

/* ===== TYPE ALIASES ===== */

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

export type StringOrNumber = string | number;

export type Status = "pending" | "active" | "inactive";

/* ===== INTERSECTION TYPES ===== */

export type StudentWithItems = User & {
  reportedItems: LostFoundItem[];
  claimsSubmitted: Claim[];
};


/* ===== AI REPORT REVIEW ===== */

export type AiReadiness = "ready" | "almost" | "not-yet";

export interface AiReply {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: AiReadiness;
}

export interface AiRequest {
  prompt: string;
}
