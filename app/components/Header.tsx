"use client"

import { useSession } from "next-auth/react"
import { useNotification } from "./Notification";



export default function Header(){
    const {data: session} = useSession();
    const (showNotification) = useNotification();

    const handleSignOut = async () => {
        try {
            
        } catch (error) {
            
        }
    }

}

