import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST() {
    try {
        const req = await req.json();
        const userData = body.formData;

        // confirm if the data exist 
    } catch (err) {
        console.log(err);
        return NextResponse.json({Error :"Error" , err} , {status:500})
    };
}