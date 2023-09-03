import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs"

connect()

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { userName, email, password, firstName, lastName } = reqBody

    if (!userName) return NextResponse.json({ error: "Enter a username" })
    if (!email) return NextResponse.json({ error: "Enter a email" })
    if (!password) return NextResponse.json({ error: "Enter a password" })

    await User.findOne({ email })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}