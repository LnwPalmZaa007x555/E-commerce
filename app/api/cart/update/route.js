import connectDB from "@/config/db";
import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        
        const {userId} = getAuth(req)

        const {cartData} = await req.json()

        await connectDB()
        const user = await User.findById(userId)

        user.cartItems = cartData
        await user.save()

        return NextResponse.json({success:true})

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}
//https://youtu.be/nxK_TCt2pKw?si=nvH6Vj-a7v9ERFBN 2.27.50