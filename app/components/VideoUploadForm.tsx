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
      const res = await fetch("/api/video/upload", {
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
      className="space-y-4"
      encType="multipart/form-data"
    >
      <div>
        <label className="block font-semibold">Title</label>
        <input
          name="title"
          type="text"
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Video File</label>
        <input
          name="file"
          type="file"
          accept="video/*"
          className="border p-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Publishing..." : "Publish Video"}
      </button>

      {error && (
        <p className="text-red-600 font-medium mt-4">
          ❌ {error}
        </p>
      )}

      {response && (
        <pre className="bg-gray-100 p-4 mt-4 overflow-x-auto">
          {typeof response === "string"
            ? response
            : JSON.stringify(response, null, 2)}
        </pre>
      )}
    </form>
  );
}
