import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos = [] }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.map((video) => (
        <VideoComponent
          key={video._id?.toString() || video.videoUrl}
          video={video}
        />
      ))}
    </div>
  );
}
