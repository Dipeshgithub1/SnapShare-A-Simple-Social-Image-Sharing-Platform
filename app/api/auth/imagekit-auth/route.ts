
import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
   
   try {
     const session = await getServerSession(authOptions);
     if (!session) {
       return NextResponse.json(
         { error: "Unauthorized" },
         { status: 401 }
       );
     }

     const authenticationParameters = getUploadAuthParams({
         privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
         
     })
 
     return Response.json(authenticationParameters)
 }
    catch (error) {
        console.error("ImageKit auth error:", error);
    return Response.json(
        {
         error: "Authentication fot Imagekit failed",
        },
        { status: 500});
    }
   }