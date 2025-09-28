import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/address";
import Order from "@/models/order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        const {userId} = getAuth

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({
                sucess:false,
                message: 'not auth'
            })
        }

        await connectDB()

        Address.length

        const orders = await Order.find({}).populate('address items.product')

        return NextResponse.json({
            success: true,
            orders
        })

    } catch (error) {
        return NextResponse.json({
            success: true,
            message:error.message
        })
    }
    
}