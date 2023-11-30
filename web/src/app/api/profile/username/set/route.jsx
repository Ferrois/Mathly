import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { usernameValidator } from "@/libs/validations/username";

export async function POST(req) {
  try {
    const body = await req.json();
    const username = usernameValidator.parse(body.username).username;
    const session = await getServerSession(authOptions);

    const currentUsername = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: { username: true },
    }).username;

    // Guard Clause 1: Current User has username set
    if (currentUsername !== "null") {
      return new NextResponse("You already have a username", { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: { username },
    });

    // Guard Clause 2: Username Exists
    if (exist) return new NextResponse("This username is taken", { status: 400 });

    // Success
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        username,
      },
    });

    return new NextResponse("Username set to " + username, { status: 200 });
  } catch (err) {
    console.log(err, "---- USERNAME DEBUG");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
