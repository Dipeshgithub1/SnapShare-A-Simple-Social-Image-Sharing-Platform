import Image from "next/image";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";

export default async function Home() {
  let videos: IVideo[] = [];
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/video`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }
    videos = await res.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">All Reels</h1>
        <p className="text-lg text-gray-200">Explore a world of captivating videos and share your own!</p>
      </div>
      <VideoFeed videos={videos} />
    </div>
  );
}
