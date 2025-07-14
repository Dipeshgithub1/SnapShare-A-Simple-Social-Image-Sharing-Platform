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
    <div className="bg-[#232946] dark:bg-[#232946] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-[#232946] dark:border-[#232946]">
      <Link href={`/video/${_id}`} className="block">
        <div className="relative w-full aspect-video bg-[#181825] dark:bg-[#181825]">
          {finalThumbnailUrl && !showVideoFallback ? (
            <Image
              src={finalThumbnailUrl}
              alt={title}
              fill
              className="rounded-t-2xl object-cover"
              onError={() => setShowVideoFallback(true)}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover rounded-t-2xl"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#e0e6ed] dark:text-[#e0e6ed] truncate mb-1">{title}</h3>
          <p className="text-sm text-[#b8c1ec] dark:text-[#b8c1ec] line-clamp-2">{description}</p>
        </div>
      </Link>
    </div>
  );
}
