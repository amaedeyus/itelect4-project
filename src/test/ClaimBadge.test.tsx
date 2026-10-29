
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ClaimBadge from "../components/ClaimBadge";
import { ClaimStatus } from "../types";
import type { Claim } from "../types";

describe("ClaimBadge", () => {
  it("shows Pending Verification for a pending claim", () => {
    const sampleClaim: Claim = {
      id: "claim-001",
      itemId: "item-001",
      claimantId: "user-001",
      status: ClaimStatus.Pending,
      notes: "This item belongs to me.",
    };

    render(<ClaimBadge claim={sampleClaim} />);

    expect(
      screen.getByText("Pending Verification")
    ).toBeInTheDocument();
  });
});
