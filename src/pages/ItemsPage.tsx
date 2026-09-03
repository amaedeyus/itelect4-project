import { useQuery } from "@tanstack/react-query";

import { fetchItems } from "../api/client";

import type { ApiLostFoundItem } from "../types";

function ItemsPage() {
  const {
    data,
    isPending,
    isError,
  } = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isPending) {
    return <p>Loading items...</p>;
  }

  if (isError) {
    return <p>Failed to load items.</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Lost & Found Items</h1>

      {data?.length === 0 ? (
        <p>No items found.</p>
      ) : (
        data?.map((item) => (
          <div
            key={item.id}
            className="mb-4 rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold dark:text-white">
              {item.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300">
              {item.description}
            </p>

            <p className="mt-2 text-sm dark:text-gray-400">
              Type: {item.type}
            </p>

            <p className="text-sm dark:text-gray-400">
              Reported: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemsPage;