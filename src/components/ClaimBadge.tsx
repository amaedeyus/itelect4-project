import React from "react";
import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  const getStatusText = (status: ClaimStatus): string => {
    switch (status) {
      case ClaimStatus.Pending: return "Pending Verification";
      case ClaimStatus.Verified: return "Verified & Closed";
      case ClaimStatus.Rejected: return "Rejected";
      default: return "Unknown";
    }
  };

  return (
    <div className="claim-badge" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", backgroundColor: "#f9f9f9" }}>
      <h4>Claim ID: #{claim.id}</h4>
      <p>Status: {getStatusText(claim.status)}</p>
      {claim.notes && <p>Notes: {claim.notes}</p>}
      {children}
    </div>
  );
};

export default ClaimBadge;