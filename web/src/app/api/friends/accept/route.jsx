import { addFriendValidator } from "@/libs/validations/add-friend";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { friendshipId } = body;
    const session = await getServerSession(authOptions);

    const check = await prisma.friendship.findFirst({
      where: {
        AND: [{ id: friendshipId }, { toUserId: session?.user?.id }],
      },
    });

    // Guard Clause 1: Invalid Friendship Id or Userid
    if (!check) {
      return new NextResponse("Invalid UserID/FSID", { status: 400 });
    }

    // Branch: Already Accepted
    if ((check.status = "accepted")) {
      return new NextResponse("Already Accepted", { status: 200 });
    }

    // Accept friendship
    await prisma.friendship.update({
      where: { id: friendshipId },
      data: {
        status: "accepted",
      },
    });

    return new NextResponse("Accepted", { status: 200 });
  } catch (err) {
    console.log(err, "ss");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
