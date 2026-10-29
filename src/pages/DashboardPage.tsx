
import { useState } from "react";

import UserCard from "../components/UserCard";

import type { User } from "../types";
import { Role } from "../types";

function DashboardPage() {
  const dashboardUser: User = {
    id: "1",
    name: "Campus Student",
    email: "student@campus.edu",
    role: Role.Student,
    isActive: true,
  };

  const [selectedUser, setSelectedUser] =
    useState<User>(dashboardUser);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Campus Lost &amp; Found Tracker
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Welcome to the campus lost and found dashboard.
        </p>
      </div>

      <section className="max-w-xl">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
          Active User Session
        </h2>

        <UserCard
          user={dashboardUser}
          onSelect={setSelectedUser}
        />

        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Selected User: {selectedUser.name}
        </p>
      </section>

      <section className="max-w-xl rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lost &amp; Found Items
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Browse reported items or submit a new lost or
          found item from the Items page.
        </p>
      </section>
    </div>
  );
}

export default DashboardPage;
