import React from "react";
import type { Claim } from "../types";
import { ClaimStatus } from "../types";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({
  claim,
  children,
}) => {
  const getStatusText = (status: ClaimStatus): string => {
    switch (status) {
      case ClaimStatus.Pending:
        return "Pending Verification";
      case ClaimStatus.Verified:
        return "Verified & Closed";
      case ClaimStatus.Rejected:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (): string => {
    switch (claim.status) {
      case ClaimStatus.Pending:
        return "bg-yellow-100 text-yellow-800";

      case ClaimStatus.Verified:
        return "bg-green-100 text-green-800";

      case ClaimStatus.Rejected:
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
        Claim #{claim.id}
      </h4>

      <div
        className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor()}`}
      >
        {getStatusText(claim.status)}
      </div>

      {claim.notes && (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          <span className="font-medium">Notes:</span> {claim.notes}
        </p>
      )}

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ClaimBadge;