import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, LostFoundItem, Claim } from "./types/index";
import { Role, ClaimStatus } from "./types/index";

const mockUser: User = {
  id: 1,
  name: "Xyrelle Dominique",
  email: "xyrelle@example.com",
  role: Role.Student,
  isActive: true,
};

const mockItem: LostFoundItem = {
  id: 101,
  title: "Keys near canteen",
  description: "Found a bunch of keys with a blue keychain.",
  type: "found",
  reporterId: 1,
  createdAt: new Date(),
};

const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimantId: 2,
  status: ClaimStatus.Pending,
  notes: "Matches description of missing house keys.",
};

function App() {
  return (
    <div className="app" style={{ padding: "20px" }}>
      <h1>Campus Lost & Found Tracker Dashboard</h1>
      <hr />
      
      <h2>Active User Session</h2>
      <UserCard user={mockUser} onSelect={(u) => console.log("Selected Profile:", u)} />

      <h2>Recent Postings</h2>
      <ItemCard item={mockItem} />

      <h2>Active Claims</h2>
      <ClaimBadge claim={mockClaim}>
        <span style={{ color: "orange", fontWeight: "bold" }}>⚠️ Action Required by Security</span>
      </ClaimBadge>
    </div>
  );
}

export default App;