import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";

import { mockItems } from "../data/mockData";
import type { LostFoundItem } from "../types";

function ItemsPage() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const previousSearch = usePrevious(searchTerm);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const handleItemSelect = (id: number): void => {
    navigate(`/items/${id}`);
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-300">
          Loading lost and found items...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-300">
        Could not load lost and found items.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Lost & Found Items
          </h1>

          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Browse items reported around campus.
          </p>
        </div>

        <button
          onClick={() => setIsError(true)}
          className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Simulate Error
        </button>
      </div>

      <div className="mb-6">
        <input
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search lost/found items..."
          className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <button
          onClick={() => searchInputRef.current?.focus()}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No matching items found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item.id)}
              className="cursor-pointer"
            >
              <ItemCard
                item={item}
                variant="default"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemsPage;