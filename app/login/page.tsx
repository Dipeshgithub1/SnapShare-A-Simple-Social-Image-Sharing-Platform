"use client";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import Link from "next/link";

 function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl:"/"
     })
     if(result?.error){
        console.log(result.error)
     }
     else{
        router.push("/")
     }
   }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-black"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white text-black"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;