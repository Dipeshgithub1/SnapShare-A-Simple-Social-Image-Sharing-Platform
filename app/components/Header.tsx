"use client"
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "./Notification";
import { Home, User,Sun,Moon } from "lucide-react";
import { useEffect, useState } from "react";




export default function Header(){
    const {data: session} = useSession();
    const {showNotification} = useNotification();
    const [darkMode,setDarkMode] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut();
            showNotification("Singed out successfully",'success');
            
        } catch (error) {
            showNotification("Failed to sign out",'error')
        }
    }

  //Toggle dark mode class on html tag
  
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if(html.classList.contains("dark")){
        html.classList.remove("dark")
        setDarkMode(false);
    } else {
        html.classList.add("dark");
        setDarkMode(true)
    }
  };

  useEffect(() => {
    //Default to system preference
    if (window.matchMedia("(prefers-color-scheme : dark").matches){
        document.documentElement.classList.add("dark");
        setDarkMode(true);
    }
  },[]);

    return (
        <div className="navbar bg-base-300 sticky top-0 z-40">
           <div className="container mx-auto">
            <div className="flex-1 px-2 lg:flex-none">
            <Link href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() =>
                showNotification("Welcome to ImageKit ReelsPro","info")
            }
         >
            <Home className="w-5 h-5" />
            Video with AI
         </Link>
            </div>
            {/* Right Side */}
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-center gap-4">
            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="btn btn-ghost btn-circle"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
              {/* Dropdown */}
                {/* Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                {session?.user?.image ? (
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={session.user.image} alt="profile" />
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                 <ul tabIndex={0}
                 className="mt-3 z=[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                 {session ? (
                    <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                        </span>  
                    </li>
                    <div className="divider my-1"></div>

                    <li>
                        <Link href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                        onClick={() =>
                            showNotification('Welcome to admin Dashboard',"info")
                        }
                        >
                         Video Upload   
                        </Link>
                    </li>

                    <li><button onClick={handleSignOut}
                    className="px-4 py-2 text-error hover:bg-base-200 w-full text-left">
                        Sign Out
                        </button>
                        </li>
                    </>
                 ):(
                    <li>
                    <Link href="/login"
                    className="px-4 py-2 hover:bg-base-200 block w-full"
                    onClick={() => 
                        showNotification("Please sign in to continue","info")
                    }>
                    Login
                    </Link>
                    </li>
                 
                 )}         
                 </ul>
                </div>
                </div>
                </div>
            
                </div> 
        
               </div>
    )
}
        
