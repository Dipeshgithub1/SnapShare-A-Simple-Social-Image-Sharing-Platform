export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700" />
            <div className="p-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


