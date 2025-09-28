import connectDB from "@/config/db";
import Address from "@/models/address";
import Order from "@/models/order";
import Product from "@/models/product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {
        
        const {userId} = getAuth(req)

        await connectDB()

        Address.length
        Product.length

        const orders = await Order.find({userId}).populate('address item.product')

        return NextResponse.json({
            success:true,
            orders
        })


    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
    
}