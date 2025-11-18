import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
          Video.find({}, { title: 1, description: 1, thumbnailUrl: 1, videoUrl: 1, createdAt: 1 })
            .sort({createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
          Video.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limit) || 1;
        return NextResponse.json({
          items: items || [],
          page,
          limit,
          total,
          totalPages,
        }, {status: 200})
           
    } catch (error) {
        return NextResponse.json(
            {
            error: "Failed to fetch videos"},
             {status: 500})
    }
}


export async function POST(request: NextRequest){
  try {
  const session =  await getServerSession(authOptions)
  if(!session){
    return NextResponse.json(
        { error: "Unauthorized"},
        {status: 401});
  }
  await connectToDatabase();
  const body = await request.json();

  const {title,description,videoUrl,thumbnailUrl, controls, transformation} = body; // Explicitly extract allowed fields
  if(!title || !description || !videoUrl || !thumbnailUrl){
    return NextResponse.json(
        { error: "Missing required fields"},
        {status: 400}
    )
  }

  // Basic URL validation
  const urlRegex = /^(https?:\/\/[^\s]+)$/;
  if (!urlRegex.test(videoUrl)) {
    return NextResponse.json(
      { error: "Invalid video URL format" },
      { status: 400 }
    );
  }
  if (!urlRegex.test(thumbnailUrl)) {
    return NextResponse.json(
      { error: "Invalid thumbnail URL format" },
      { status: 400 }
    );
  }

  const videoData = {
    title,
    description,
    videoUrl,
    thumbnailUrl,
    controls: controls ?? true,
    transformation: {
           height:transformation?.height ?? 1920,
           width: transformation?.width ?? 1080,
           quality: transformation?.quality ?? 100
    },
  };
 const newVideo = await Video.create(videoData)
  return NextResponse.json(newVideo, {status: 201})
  } catch (error) {
     console.error("POST /api/video error:", error);
    return NextResponse.json(
        {error: "Failed to create video"},
        {status: 500})
  }
}