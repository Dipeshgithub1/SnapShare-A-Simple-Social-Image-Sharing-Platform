"use client";

import { IVideo } from "@/models/Video";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VideoComponent({
  _id,
  title,
  description,
  videoUrl,
  thumbnailUrl,
}: IVideo) {
  const [showVideoFallback, setShowVideoFallback] = useState(false);
  const isVideo = thumbnailUrl?.endsWith(".mp4") || videoUrl.endsWith(".mp4");
  const finalThumbnailUrl = isVideo && !thumbnailUrl?.includes("?tr=f-image")
    ? `${videoUrl}?tr=f-image`
    : thumbnailUrl;

  console.log("VideoComponent - finalThumbnailUrl:", finalThumbnailUrl);
  console.log("VideoComponent - videoUrl:", videoUrl);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/video/${_id}`}>
        <div className="relative w-full aspect-video">
          {finalThumbnailUrl && !showVideoFallback ? (
            <Image
              src={finalThumbnailUrl}
              alt={title}
              fill
              className="rounded-t-lg object-cover"
              onError={() => setShowVideoFallback(true)}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
