"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  //optional validation

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")){
     
        setError("Please upload a valid video file");
        return false;
      
    }
    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if(event.lengthComputable && onProgress){
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent))
            setProgress(Math.round(percent));
          }
        },
        
      });

      console.log("ImageKit raw res.url:", res.url);

      // Helper function to remove query parameters from a URL
      const cleanUrl = (url: string) => {
        const urlObj = new URL(url);
        urlObj.search = ''; // Remove all query parameters
        return urlObj.toString();
      };

      const baseVideoOrImageUrl = cleanUrl(res.url!);
      console.log("ImageKit cleaned base URL:", baseVideoOrImageUrl);

      let generatedThumbnailUrl = baseVideoOrImageUrl;

      if (fileType === "video") {
        // Construct thumbnail URL from video URL using f-image transformation
        generatedThumbnailUrl = `${baseVideoOrImageUrl}?tr=f-image`;
      } else {
        // For images, use the clean base URL directly without any additional transformations
        generatedThumbnailUrl = baseVideoOrImageUrl;
      }

      console.log("Generated thumbnail URL:", generatedThumbnailUrl);
      console.log("Cleaned video/image URL:", baseVideoOrImageUrl);
      onSuccess({...res, thumbnailUrl: generatedThumbnailUrl, videoUrl: baseVideoOrImageUrl});
    } catch (error : any) {
        console.error("Upload failed", error)
    } finally {
        setUploading(false)
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {uploading && <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Uploading... {progress}%</span>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default FileUpload;