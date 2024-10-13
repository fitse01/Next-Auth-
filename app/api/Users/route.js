import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {  // Accept 'req' as an argument
    try {
        const body = await req.json();  // Use 'req' to get the request body
        const userData = body;  // Get userData directly from the body

        // Confirm if the data exists 
        if (!userData?.email || !userData.password) {
            return NextResponse.json({ Error: "All Fields are Required " }, { status: 400 });
        }

        // Check if the email is a duplicate 
        const duplicate = await User.findOne({ email: userData.email }).lean().exec();
        if (duplicate) {
            return NextResponse.json({ Error: "Duplicate Email " }, { status: 409 });
        }

        // Hash the password 
        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await User.create(userData);
        return NextResponse.json({ message: "User created." }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ Error: "Error", err }, { status: 500 });
    }
}
