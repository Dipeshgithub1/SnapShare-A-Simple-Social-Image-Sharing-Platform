import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

const VideoSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

export default function VideoFeed({ videos = [] }: VideoFeedProps) {
  const isLoading = videos.length === 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-6 bg-[#181825] dark:bg-[#181825]">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => <VideoSkeleton key={index} />)
      ) : (
        videos.map((video) => (
          <VideoComponent
            key={video._id?.toString() || video.videoUrl}
            {...video}
          />
        ))
      )}
    </div>
  );
}
