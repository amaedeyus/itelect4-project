
function ClaimsPage() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Claims Temporarily Unavailable
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        The Claims feature is temporarily disabled while
        the Lost & Found backend integration is being
        completed.
      </p>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        You can still browse reported items and submit new
        lost or found item reports from the Items page.
      </p>
    </div>
  );
}

export default ClaimsPage;
