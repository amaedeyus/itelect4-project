import { useState, useEffect, useRef } from "react";

import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";

import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

import type { User, LostFoundItem, Claim } from "./types";
import { Role, ClaimStatus } from "./types";

const mockUser: User = {
  id: 1,
  name: "Xyrelle Dominique Talens",
  email: "xyrelle762004@gmail.com",
  role: Role.Student,
  isActive: true,
};

const mockItem: LostFoundItem = {
  id: 101,
  title: "C2 na green sa Chez",
  description: "May C2 na green na medyo ubos",
  type: "found",
  reporterId: 1,
  createdAt: new Date(),
};

const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimantId: 2,
  status: ClaimStatus.Pending,
  notes: "Matches description of missing unfinished drink.",
};

function App() {
  // ===== State =====
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== Ref =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== Custom Hooks =====
  const [showClaims, toggleClaims] = useToggle(true);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== Load Mock Data =====
  useEffect(() => {
    setTimeout(() => {
      setItems([mockItem]);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== Search =====
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== Styled Loading =====
  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-center text-lg text-gray-500">
        Loading Lost & Found records...
      </div>
    );
  }

  // ===== Styled Error =====
  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-100 p-4 text-red-700">
        Unable to load records. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 p-6 transition-colors dark:bg-gray-900">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Campus Lost & Found Tracker
          </h1>

          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-black dark:bg-gray-200 dark:text-gray-900"
            >
              {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>

            <button
              onClick={() => setIsError(true)}
              className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              Simulate Error
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search lost/found items..."
            className="w-full rounded border border-gray-300 p-3 shadow-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={() => searchInputRef.current?.focus()}
            className="mt-3 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Focus Search
          </button>

          {previousSearch !== undefined &&
            previousSearch !== searchTerm && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Previous Search: "{previousSearch}"
              </p>
            )}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* User */}
          <div>
            <h2 className="mb-3 text-xl font-semibold dark:text-white">
              Active User
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
          </div>

          {/* Items */}
          <div>
            <h2 className="mb-3 text-xl font-semibold dark:text-white">
              Recent Items
            </h2>

            {filteredItems.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No matching items.
              </p>
            ) : (
              filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  variant="compact"
                />
              ))
            )}
          </div>

          {/* Claims */}
          <div>
            <button
              onClick={toggleClaims}
              className="mb-3 rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
            >
              {showClaims ? "Hide Claims" : "Show Claims"}
            </button>

            {showClaims && (
              <ClaimBadge claim={mockClaim}>
                <span className="font-semibold text-orange-500">
                  ⚠ Action Required by Security
                </span>
              </ClaimBadge>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;