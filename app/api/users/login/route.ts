import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody;
    if (!email) return NextResponse.json({ error: "Enter a email" })
    if (!password) return NextResponse.json({ error: "Enter a password" })

    // Check if user exist
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ error: 'User does not exist' }, { status: 400 })

    // Check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) return NextResponse.json({ error: 'Password is not correct' }, { status: 400 })

    // Token is created when user sign in , Token is a ticket, created by jsonwebtoken
    // The token is send into cookies, not localstorage. We can access the cookies if we want

    const tokenData = {
      id: user._id,
      username: user.userName,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName
    }

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

    const response = NextResponse.json({ message: "Login successful", success: true })
    response.cookies.set("token", token, { httpOnly: true })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}