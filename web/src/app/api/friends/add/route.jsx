import { addFriendValidator } from "@/libs/validations/add-friend";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = addFriendValidator.parse(body.email);

    const DBResponse = await prisma.user.findUnique({
      where: {
        email: email.email,
      },
    });

    const idToAdd = DBResponse?.id;

    if (!idToAdd) {
      return new NextResponse("This person does not exist", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    console.log(session, "Session");

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new NextResponse("You cannot add yourself as a friend!", { status: 400 });
    }

    // Check if user is already added
    const currentFriendship = await prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId: session.user.id, toUserId: idToAdd },
      },
    });

    if (currentFriendship?.status == "pending") {
      return new NextResponse("Friend request already sent", { status: 400 });
    }

    if (currentFriendship?.status == "accepted") {
      return new NextResponse("You are already friends!", { status: 400 });
    }

    // Valid Request

    if (currentFriendship?.status == "rejected") {
      await prisma.friendship.update({
        where: {
          fromUserId_toUserId: { fromUserId: session.user.id, toUserId: idToAdd },
        },
        data: {
          status: "pending",
        },
      });

      return new NextResponse("Friend request re-sent!", { status: 200 });
    }

    await prisma.friendship.create({
      data: {
        fromUserId: session.user.id,
        toUserId: idToAdd,
      },
    });

    return new NextResponse("Friend request sent!", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
