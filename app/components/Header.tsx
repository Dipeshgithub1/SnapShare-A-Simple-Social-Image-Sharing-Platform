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
            showNotification("Signed out successfully",'success');
            
        } catch (error) {
            showNotification("Failed to sign out",'error')
        }
    }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const html = document.documentElement;
    if(newDarkMode){
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDarkMode(false);
      }
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDarkMode(false);
      }
    }
  }, []);

    return (
  <header className="sticky top-0 z-50 bg-[#181825]/90 dark:bg-[#181825]/90 backdrop-blur border-b border-[#232946] dark:border-[#232946] shadow-sm">
    <nav className="container mx-auto flex items-center justify-between py-3 px-4">
      {/* Left: Logo/Home */}
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-[#a786df] hover:opacity-80 transition" prefetch={true} onClick={() => showNotification("Welcome to ImageKit ReelsPro","info") }>
        <Home className="w-6 h-6" />
        <span>SnapShare</span>
      </Link>
      {/* Center: Navigation */}
      <div className="hidden md:flex gap-6 text-base font-medium">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-[#a786df] transition">Home</Link>
        <Link href="/upload" className="hover:text-indigo-600 dark:hover:text-[#a786df] transition">Upload</Link>
      </div>
      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="btn btn-ghost btn-circle" title="Toggle Dark Mode">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {/* User Dropdown */}
        <div className="relative">
          <button tabIndex={0} className="btn btn-ghost btn-circle avatar focus:outline-none">
            {session?.user?.image ? (
              <span className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500 dark:border-[#a786df]">
                <img src={session.user.image} alt="profile" className="w-full h-full object-cover" />
              </span>
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>
          <ul className="absolute right-0 mt-2 w-48 bg-[#232946] dark:bg-[#232946] border border-[#232946] dark:border-[#232946] rounded-lg shadow-lg py-2 z-50">
            {session ? (
              <>
                <li className="px-4 py-2 text-sm text-[#e0e6ed] dark:text-[#e0e6ed]">{session.user?.email?.split("@")[0]}</li>
                <li><hr className="my-1 border-[#232946] dark:border-[#232946]" /></li>
                <li>
                  <Link href="/upload" className="block px-4 py-2 hover:bg-[#181825] dark:hover:bg-[#181825] transition">Video Upload</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#181825] dark:hover:bg-[#181825] transition">Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="block px-4 py-2 hover:bg-[#181825] dark:hover:bg-[#181825] transition">Login</Link>
                </li>
                <li>
                  <Link href="/register" className="block px-4 py-2 hover:bg-[#181825] dark:hover:bg-[#181825] transition">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </header>
    )
}
        
