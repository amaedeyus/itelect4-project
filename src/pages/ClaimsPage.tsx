import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ClaimBadge from "../components/ClaimBadge";

import { fetchClaims, createClaim } from "../api/client";

import { ClaimStatus } from "../types";

function ClaimsPage() {
  const queryClient = useQueryClient();

  const {
    data: claims,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["claims"],
      });
    },
  });

  if (isPending) {
    return <p>Loading claims...</p>;
  }

  if (isError) {
    return <p>Failed to load claims.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Active Claims
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Review claims submitted for lost and found items.
      </p>

      <div className="mt-6 max-w-xl">
        {claims.map((claim) => (
          <ClaimBadge key={claim.id} claim={claim}>
            <span className="font-semibold text-orange-500">
              ⚠ Action Required by Security
            </span>
          </ClaimBadge>
        ))}

        <button
          onClick={() =>
            addClaim.mutate({
              itemId: 101,
              claimantId: 2,
              status: ClaimStatus.Pending,
              notes: "I believe this item belongs to me.",
            })
          }
          className="mt-4 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Submit Claim
        </button>
      </div>
    </div>
  );
}

export default ClaimsPage;