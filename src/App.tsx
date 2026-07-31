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
  // ===== useState<T> =====
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== useRef =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== Custom Hooks =====
  const [showClaims, toggleClaims] = useToggle(true);
  const previousSearch = usePrevious(searchTerm);

  // ===== useEffect =====
  useEffect(() => {
    setTimeout(() => {
      setItems([mockItem]);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== Typed onChange =====
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== Filtered Items =====
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading items...</p>;
  }

  return (
    <div className="app" style={{ padding: "20px" }}>
      <h1>Campus Lost & Found Tracker Dashboard</h1>

      <hr />

      <h2>Search Items</h2>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search item..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => searchInputRef.current?.focus()}
      >
        Focus Search
      </button>

      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p>Previous Search: "{previousSearch}"</p>
        )}

      <hr />

      <h2>Active User Session</h2>

      <UserCard
        user={mockUser}
        onSelect={setSelectedUser}
      />

      {selectedUser && (
        <p>
          <strong>Selected User:</strong> {selectedUser.name}
        </p>
      )}

      <hr />

      <h2>Recent Postings</h2>

      {filteredItems.length === 0 ? (
        <p>No matching items found.</p>
      ) : (
        filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))
      )}

      <hr />

      <button onClick={toggleClaims}>
        {showClaims ? "Hide Claims" : "Show Claims"}
      </button>

      {showClaims && (
        <>
          <h2>Active Claims</h2>

          <ClaimBadge claim={mockClaim}>
            <span
              style={{
                color: "orange",
                fontWeight: "bold",
              }}
            >
              ⚠️ Action Required by Security
            </span>
          </ClaimBadge>
        </>
      )}
    </div>
  );
}

export default App;