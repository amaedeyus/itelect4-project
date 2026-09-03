import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import UserCard from "../components/UserCard";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims } from "../api/client";

import type { User, Claim } from "../types";
import { Role } from "../types";

function DashboardPage() {
  const dashboardUser: User = {
    id: 1,
    name: "Campus Student",
    email: "student@campus.edu",
    role: Role.Student,
    isActive: true,
  };

  const [selectedUser, setSelectedUser] = useState<User>(dashboardUser);

  const {
    data: claims,
    isPending,
    isError,
  } = useQuery<Claim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const activeClaim = claims?.[0];

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
            user={dashboardUser}
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

          {isPending && (
            <p className="text-gray-600 dark:text-gray-300">
              Loading claim...
            </p>
          )}

          {isError && (
            <p className="text-red-600 dark:text-red-400">
              Could not load claims.
            </p>
          )}

          {!isPending && !isError && !activeClaim && (
            <p className="text-gray-600 dark:text-gray-300">
              No claims have been submitted yet.
            </p>
          )}

          {activeClaim && (
            <ClaimBadge claim={activeClaim}>
              <span className="font-semibold text-orange-500">
                ⚠ Action Required by Security
              </span>
            </ClaimBadge>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;