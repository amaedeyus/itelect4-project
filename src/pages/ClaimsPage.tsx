import ClaimBadge from "../components/ClaimBadge";
import { mockClaim } from "../data/mockData";

function ClaimsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Active Claims
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Review claims submitted for lost and found items.
      </p>

      <div className="mt-6 max-w-xl">
        <ClaimBadge claim={mockClaim}>
          <span className="font-semibold text-orange-500">
            ⚠ Action Required by Security
          </span>
        </ClaimBadge>
      </div>
    </div>
  );
}

export default ClaimsPage;