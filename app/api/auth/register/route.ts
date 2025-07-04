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

    await connectToDatabase()
    const existingUser = await User.findOne({ email});
    if(existingUser){
        return NextResponse.json({
            error: "User already registered"},
        {status: 400})
    }

    await User.create({
        email,
        password,
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