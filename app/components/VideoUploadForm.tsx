"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/videos/upload", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} ${errorText}`);
      }

      const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      setResponse(data);
      console.log("Upload success:", data);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8"
      encType="multipart/form-data"
    >
      <div>
        <label className="block font-semibold text-gray-800 dark:text-gray-200">
          🎬 Title
        </label>
        <input
          name="title"
          type="text"
          className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-800 dark:text-gray-200">
          📝 Description
        </label>
        <textarea
          name="description"
          className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-800 dark:text-gray-200">
          📁 Upload Video
        </label>
        <input
          name="file"
          type="file"
          accept="video/*"
          className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 font-semibold rounded-md text-white ${
          loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Publishing..." : "🚀 Publish Video"}
      </button>

      {error && (
        <p className="text-red-600 dark:text-red-400 font-medium mt-4">
          ❌ {error}
        </p>
      )}

      {response && (
        <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 mt-4 rounded-md overflow-x-auto">
          {typeof response === "string"
            ? response
            : JSON.stringify(response, null, 2)}
        </pre>
      )}
    </form>
  );
}
