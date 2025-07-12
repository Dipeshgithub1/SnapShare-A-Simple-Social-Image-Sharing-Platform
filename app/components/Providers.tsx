
"use client"
import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"
import React from "react"

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

if(!urlEndPoint){
    throw new Error("Missing Next_pUblic_URL_ENDPOINT IN.env")
}


export default function Providers ({children} : { children: React.ReactNode}){
    return<SessionProvider refetchInterval={5 * 60}>
    <ImageKitProvider urlEndpoint={urlEndPoint}>{children} </ImageKitProvider>   
    </SessionProvider>
}