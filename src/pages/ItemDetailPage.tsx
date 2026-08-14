import { Link, useParams } from "react-router";

import ItemCard from "../components/ItemCard";
import { mockItems } from "../data/mockData";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();

  const item = mockItems.find(
    (currentItem) => currentItem.id === Number(id)
  );

  if (!item) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-red-700 dark:bg-red-900/30 dark:text-red-300">
        <h1 className="text-2xl font-bold">
          Item Not Found
        </h1>

        <p className="mt-2">
          No lost or found item exists with ID #{id}.
        </p>

        <Link
          to="/items"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back to Items
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/items"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Items
        </Link>
      </div>

      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Item Details
      </h1>

      <ItemCard
        item={item}
        variant="default"
      />

      <div className="mt-6 rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Item Information
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Item ID: #{item.id}
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Reporter ID: #{item.reporterId}
        </p>
      </div>
    </div>
  );
}

export default ItemDetailPage;