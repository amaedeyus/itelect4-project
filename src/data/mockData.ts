import type {
  User,
  LostFoundItem,
  Claim,
} from "../types";

import { Role, ClaimStatus } from "../types";

export const mockUser: User = {
  id: 1,
  name: "Xyrelle Dominique Talens",
  email: "xyrelle762004@gmail.com",
  role: Role.Student,
  isActive: true,
};

export const mockItems: LostFoundItem[] = [
  {
    id: 101,
    title: "C2 na green sa Chez",
    description: "May C2 na green na medyo ubos",
    type: "found",
    reporterId: 1,
    createdAt: new Date(),
  },
  {
    id: 102,
    title: "Keys near canteen",
    description: "Found a bunch of keys with a blue keychain.",
    type: "found",
    reporterId: 1,
    createdAt: new Date(),
  },
  {
    id: 103,
    title: "Black Wallet",
    description: "Black wallet found near the library.",
    type: "found",
    reporterId: 1,
    createdAt: new Date(),
  },
];

export const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimantId: 2,
  status: ClaimStatus.Pending,
  notes: "Matches description of missing unfinished drink.",
};