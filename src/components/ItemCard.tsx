import type { LostFoundItem } from "../types";

interface ItemCardProps {
  item: LostFoundItem;
  variant?: "default" | "compact";
}

function ItemCard({
  item,
  variant = "default",
}: ItemCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3
        className={`font-bold text-gray-900 dark:text-white ${
          isCompact ? "text-base" : "text-xl"
        }`}
      >
        {item.title}
      </h3>

      {!isCompact && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">Type:</span>{" "}
        <span
          className={`font-semibold ${
            item.type === "found"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {item.type.toUpperCase()}
        </span>
      </p>

      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Reported on: {item.createdAt.toLocaleDateString()}
      </p>
    </div>
  );
}

export default ItemCard;