import { useState } from "react";

import UserCard from "../components/UserCard";
import ClaimBadge from "../components/ClaimBadge";

import { mockUser, mockClaim } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState(mockUser);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Campus Lost & Found Tracker
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Welcome to the campus lost and found dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Active User Session
          </h2>

          <UserCard
            user={mockUser}
            onSelect={setSelectedUser}
          />

          {selectedUser && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              Selected User: {selectedUser.name}
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Active Claim
          </h2>

          <ClaimBadge claim={mockClaim}>
            <span className="font-semibold text-orange-500">
              ⚠ Action Required by Security
            </span>
          </ClaimBadge>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;