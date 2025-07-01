"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video) return;

    const formData = new FormData();
    formData.append("file", video);

    const res = await fetch("/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Uploaded file URL:", data.url);
    // You can now POST this to /api/videos to save metadata
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {preview && (
        <video src={preview} controls className="w-full mt-4" />
      )}
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white">
        Upload
      </button>
    </form>
  );
}
