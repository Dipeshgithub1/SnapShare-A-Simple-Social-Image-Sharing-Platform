export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700" />
        <div className="p-4">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-3" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}


