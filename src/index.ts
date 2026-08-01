import type {
  User,
  LostFoundItem,
  ApiResponse,
  ItemPreview,
  StringOrNumber,
} from "../types/index";
import { Role, ClaimStatus } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====

const projectName: string = "itelect4-project";
const currentYear: number = 2026;

// Typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

// void return type
function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====

// unknown
let userInput: unknown = "test";

if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// ===== USING INTERFACES =====

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: Role.Student,
  isActive: true,
};

const lostItem: LostFoundItem = {
  id: 101,
  title: "Keys near canteen",
  description: "Found a bunch of keys with a blue keychain.",
  type: "found",
  reporterId: 1,
  createdAt: new Date(),
};

console.log(student);
console.log(lostItem);

// ===== GENERIC FUNCTIONS =====

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([student]);
const foundItem = getById<LostFoundItem>([lostItem], 101);

console.log(firstUser?.name);
console.log(foundItem?.title);

// ===== USING GENERIC INTERFACE =====

const itemResponse: ApiResponse<LostFoundItem> = {
  success: true,
  data: lostItem,
};

console.log(itemResponse.data.title);

// ===== USING UTILITY TYPES =====

const preview: ItemPreview = {
  id: 101,
  title: "Keys near canteen",
  type: "found",
};

console.log(preview);

// ===== USING ENUMS =====

let status: ClaimStatus = ClaimStatus.Pending;

console.log(ClaimStatus[status]);

status = ClaimStatus.Verified;

console.log(status === ClaimStatus.Verified);

// ===== TYPE NARROWING =====

function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));