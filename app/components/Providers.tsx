
"use client"
import { ImageKitProvider } from "@imagekit/react";
import { SessionProvider } from "next-auth/react"
import React from "react"
import { NotificationProvider } from "./Notification"; // Import NotificationProvider

const urlEndPoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

if(!urlEndPoint){
    throw new Error("Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in .env")
}


export default function Providers ({children} : { children: React.ReactNode}){
    return(
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                <NotificationProvider>{children}</NotificationProvider>
            </ImageKitProvider>   
        </SessionProvider>
    )
}