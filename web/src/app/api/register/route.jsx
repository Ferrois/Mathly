import bcrypt from "bcryptjs";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Guard Clause 1: Missing data
    if (!name || !email || !password) return new NextResponse("Missing Fields", { status: 400 });

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Guard Clause 2: Email exists
    if (exist) {
      throw new NextResponse("Email Already Exists", { status: 400 });
    }

    const exist2 = await prisma.user.findUnique({
      where: {
        username: name,
      },
    });

    // Guard Clause 3: Username Exists
    if (exist2) {
      throw new NextResponse("Username is taken!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username: name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
}
