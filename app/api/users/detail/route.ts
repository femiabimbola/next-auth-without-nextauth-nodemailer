import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

// This route help us get details

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request)
    // This means I don't want password
    const user = await User.findOne({ _id: userId }).select('-password ')
    return NextResponse.json({ message: 'user found', data: user }, { status: 200 })
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}