import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
        404
      </h1>

      <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
        Page not found.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;