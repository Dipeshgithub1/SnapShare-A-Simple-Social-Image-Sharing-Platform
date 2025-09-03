import { connectToDatabase } from "@/lib/db";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    try {
    const {email,password} =   await request.json();

    if(!email || !password){
        return NextResponse.json(
            {error: "Email and password are required"},
            {status: 400}
         )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password strength validation (e.g., minimum 8 characters, at least one uppercase, one lowercase, one number, one special character)
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter" },
        { status: 400 }
      );
    }
    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter" },
        { status: 400 }
      );
    }
    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one number" },
        { status: 400 }
      );
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one special character" },
        { status: 400 }
      );
    }

    await connectToDatabase()
    const existingUser = await User.findOne({ email});
    if(existingUser){
        return NextResponse.json({
            error: "User already registered"},
        {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        email,
        password: hashedPassword,
    })
    return NextResponse.json(
        {message: "User registered successfully"},
        {status: 400})

    } catch (error) {
        console.error("Error registering user:",error)
        return NextResponse.json(
        {error: "Failed to register user"},
        {status:400})
        
    }
}