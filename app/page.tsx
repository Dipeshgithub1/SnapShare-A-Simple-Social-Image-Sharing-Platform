import Image from "next/image";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";

export default async function Home() {
  let items: IVideo[] = [];
  try {
    // Use relative URL to avoid slow external resolution and leverage Next's internal fetch cache.
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/video?page=1&limit=20`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }
    const data = await res.json();
    items = data?.items || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">All Reels</h1>
        <p className="text-lg text-gray-200">Explore a world of captivating videos and share your own!</p>
      </div>
      <VideoFeed videos={items} />
    </div>
  );
}
