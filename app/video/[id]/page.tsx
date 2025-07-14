import { IVideo } from "@/models/Video";
import VideoComponent from "@/app/components/VideoComponent";

interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  let video: IVideo | null = null;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/video/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return <div className="text-center text-red-500">Video not found.</div>;
      }
      throw new Error("Failed to fetch video");
    }
    video = await res.json();
  } catch (error) {
    console.error("Error fetching video:", error);
    return <div className="text-center text-red-500">Error loading video.</div>;
  }

  if (!video) {
    return <div className="text-center text-gray-500">Loading video...</div>; // Or a more elaborate loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoComponent {...video} />
    </div>
  );
} 