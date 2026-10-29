
function ClaimsPage() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Claims
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        The claims feature is not available yet.
        Backend integration for item claims has not been completed.
      </p>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        In the meantime, visit the Items page to browse reported
        lost and found items or submit a report.
      </p>
    </div>
  );
}

export default ClaimsPage;
