import type { User } from "../types";
import { Role } from "../types";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onSelect(user);
  };

  const handleNoteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log("Admin note for user:", e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>

      <p className="mt-1 text-gray-600 dark:text-gray-300">
        <span className="font-medium">Email:</span> {user.email}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">Role:</span>{" "}
        {user.role === Role.SecurityAdmin
          ? "Security Admin"
          : "Student"}
      </p>

      <button
        onClick={handleClick}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View Profile
      </button>

      <input
        onChange={handleNoteChange}
        placeholder="Add administrative note..."
        className="mt-3 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
}

export default UserCard;