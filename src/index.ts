import type { User, LostFoundItem, Claim, ApiResponse, ItemUpdate, ItemPreview } from "../types/index";
import { Role, ClaimStatus } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
// Variables with explicit types
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;
// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
return `Welcome to ${name} -- AY ${year}!`;
}
// void: function that does NOT return a value
function logMessage(message: string): void {
console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
// any -- disables TypeScript type checking
// [!] Avoid using this; it defeats the purpose of TypeScript
let anything: any = "hello";
anything = 42; // No error
anything = true; // No error
// unknown -- the safer version of any
// You MUST check the type before using it
let userInput: unknown = "test";
if (typeof userInput === "string") {
console.log(userInput.toUpperCase()); // OK -- TypeScript knows it's a string here
}
// never -- a function that NEVER returns
// Used when a function always throws an error or loops forever
function throwError(message: string): never {
throw new Error(message);
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
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic -- T must have an "id: number" field
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
// Partial<T> -- update payload only needs the changed fields
const patch: ItemUpdate = { description: "Keys found near the vending machine." };

// Pick<T,K> -- a lightweight preview object
const preview: ItemPreview = { id: 101, title: "Keys near canteen", type: "found" };
console.log(preview);

// ===== USING ENUMS =====
let status: ClaimStatus = ClaimStatus.Pending;
console.log(ClaimStatus[status]); // "Pending" -- reverse mapping
status = ClaimStatus.Verified;
console.log(status === ClaimStatus.Verified); // true

// ===== TYPE NARROWING =====
import type { StringOrNumber } from "../types/index";
// Narrowing with typeof
// Without the if-check, TypeScript would error:
// Property 'toUpperCase' does not exist on type 'number'
function processInput(input: StringOrNumber): string {
if (typeof input === "string") {
return input.toUpperCase(); // TypeScript knows: input is string here
}
return input.toFixed(2); // TypeScript knows: input is number here
}
// Narrowing with instanceof
// Used with class instances like Date, Error, etc.
function formatDate(value: string | Date): string {
if (value instanceof Date) {
return value.toLocaleDateString(); // TypeScript knows: it's a Date
}
return value; // TypeScript knows: it's a string
}
console.log(processInput("hello")); // HELLO
console.log(processInput(3.14159)); // 3.14
console.log(formatDate(new Date())); // e.g. 7/4/2026