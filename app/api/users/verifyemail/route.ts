import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";

connect()

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { token } = reqBody;
    if (!token) return NextResponse.json({ error: 'No token found' }, { status: 500 })
    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
    if (!user) return NextResponse.json({ error: 'No user found' }, { status: 500 })
    console.log(user)

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save().then()
    return NextResponse.json({ success: "Email verified successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}