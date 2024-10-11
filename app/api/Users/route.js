import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST() {
    try {
        const req = await req.json();
        const userData = body.formData;

        // confirm if the data exist 
        if(!userData?.email || !userData.password){
            return NextResponse.json({Error :"All Fields are Required " } , {status:400});
        }

        // check if the email is duplicate 
        const duplicate = await User.findOne({email : userData.email}).lean().exec();
        if(duplicate){
            return NextResponse.json({Error :"Duplicate Email " } , {status:409});
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({Error :"Error" , err} , {status:500});
    };
}