import type { User } from "../types/index";
import { Role } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(user);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Admin note for user:", e.target.value);
  };

  return (
    <div className="user-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role === Role.SecurityAdmin ? "Security Admin" : "Student"}</p>
      <button onClick={handleClick}>View Profile</button>
      <input onChange={handleNoteChange} placeholder="Add administrative note..." />
    </div>
  );
}

export default UserCard;