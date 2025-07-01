"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import { Button } from "@/component/ui/button";
import Link from "next/link";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try {
       // react-query
      // loading, error, debounce
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
      })
     const data = await response.json();
     if(!response.ok){
       throw new Error(data.error || 'Registration failed')
     }
      console.log("Registration successful", data);
      router.push('/login');
    } catch (error) {
      console.error("Registration error:", error)
    }
  }
  return (
     <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
        <input
        id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <input
         id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="w-full">Register</button>
      </form>
      <div>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "} <Link href="/login" className="text-blue-600 hover:underline">
          Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage