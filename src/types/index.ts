// ===== ENUMS =====
export const enum Role {
  Student = "student",
  SecurityAdmin = "security_admin"
}

export enum ClaimStatus {
  Pending,
  Verified,
  Rejected
}

// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface LostFoundItem {
  id: number;
  title: string;
  description: string;
  type: "lost" | "found";
  reporterId: number;
  createdAt: Date;
}

export interface Claim {
  id: number;
  itemId: number;
  claimantId: number;
  status: ClaimStatus;
  notes?: string; // ? means this field is optional
}

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type ItemUpdate = Partial<LostFoundItem>;
export type ItemPreview = Pick<LostFoundItem, "id" | "title" | "type">;

// ===== TYPE ALIASES =====
// A type alias gives a name to any type -- primitives, unions, functions, objects
// Alias for a union type (string OR number)
export type ID = number | string;
// Alias for an object shape
export type Coordinate = {
  x: number;
  y: number;
};
// Alias for a function signature
export type Formatter = (value: number) => string;
// Using them
const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;
console.log(studentId); // S2026-001
console.log(formatScore(95.5)); // 95.5%

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive"; // literal union
// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}
printId(101);
printId("S2026-001");

// ===== INTERSECTION TYPES -- combines ALL properties =====
export type StudentWithItems = User & {
  reportedItems: LostFoundItem[];
  claimsSubmitted: Claim[];
};