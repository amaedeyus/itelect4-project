
  import { useState, type FormEvent } from "react";
  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";

  import { fetchItems, createItem } from "../api/client";
  import type { ApiLostFoundItem } from "../types";
  import { useAuthStore } from "../store/authStore";

  type ItemType = "lost" | "found";

  function ItemsPage() {
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<ItemType>("lost");
    const [message, setMessage] = useState("");

    
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items", token],
    queryFn: () => {
      if (!token) {
        throw new Error("Please log in to view items.");
      }

      return fetchItems(token);
    },
    enabled: Boolean(token),
  });


    const addItem = useMutation({
      mutationFn: async (values: {
        title: string;
        description: string;
        type: ItemType;
      }) => {
        if (!token) {
          throw new Error("Please log in first.");
        }

        return createItem(values, token);
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["items"],
        });

        setTitle("");
        setDescription("");
        setType("lost");
        setMessage("Item created successfully!");
      },

      onError: (error) => {
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to create item."
        );
      },
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setMessage("");

      addItem.mutate({
        title: title.trim(),
        description: description.trim(),
        type,
      });
    }

    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">
          Lost &amp; Found Items
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="text-xl font-semibold dark:text-white">
            Report a Lost or Found Item
          </h2>

          <div>
            <label
              htmlFor="item-title"
              className="mb-1 block font-medium"
            >
              Title
            </label>

            <input
              id="item-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Black Umbrella"
              required
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="item-description"
              className="mb-1 block font-medium"
            >
              Description
            </label>

            <textarea
              id="item-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the item and where it was lost or found."
              required
              rows={4}
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="item-type"
              className="mb-1 block font-medium"
            >
              Item Type
            </label>

            <select
              id="item-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as ItemType)
              }
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={addItem.isPending}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addItem.isPending ? "Submitting..." : "Submit Item"}
          </button>

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        <h2 className="mb-4 text-xl font-semibold">
          Reported Items
        </h2>

        {isPending ? (
          <p>Loading items...</p>
        ) : isError ? (
          <p>
  {error instanceof Error
    ? `Failed to load items: ${error.message}`
    : "Failed to load items."}
</p>
        ) : data?.length === 0 ? (
          <p>No items found.</p>
        ) : (
          data?.map((item) => (
            <div
              key={item.id}
              className="mb-4 rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>

              <p className="mt-2 text-sm dark:text-gray-400">
                Type: {item.type}
              </p>

              <p className="text-sm dark:text-gray-400">
                Reported:{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  export default ItemsPage;
