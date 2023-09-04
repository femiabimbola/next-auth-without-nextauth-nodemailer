import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { userName, email, password, firstName, lastName } = reqBody

    if (!userName) return NextResponse.json({ error: "Enter a username" })
    if (!email) return NextResponse.json({ error: "Enter a email" })
    if (!password) return NextResponse.json({ error: "Enter a password" })

    // If user exist
    const user = await User.findOne({ email })
    if (user) return NextResponse.json({ error: "User already exist" }, { status: 400 })

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({ userName, email, password: hashedPassword })
    const savedUser = await newUser.save()

    return NextResponse.json({ message: "user created successfully", savedUser }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}