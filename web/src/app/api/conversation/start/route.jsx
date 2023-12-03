import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getFriendship } from "@/libs/helper/getFriendship";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;
    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorised", { status: 401 });

    const friendshipExists = await getFriendship([session.user.id, id]);

    // Guard Clause 1: Friendship does not exist
    if (!friendshipExists) return new NextResponse("You are not friends with this user", { status: 400 });

    // Guard Clause 2: Friendship exists but it is not accepted
    if (friendshipExists.status !== "accepted")
      return new NextResponse("This person has not accepted your friend request", { status: 400 });

    const currentConversation = await prisma.conversation.findMany({
      where: {
        membersId: { hasEvery: [session.user.id, id] },
      },
    });

    // Guard Clause 3: Conversation already exists
    if (currentConversation?.length > 0) {
      return new NextResponse("You are already chatting with this person", { status: 200 });
    }

    // Create a conversation
    await prisma.conversation.create({
      data: {
        membersId: [id, session.user.id],
      },
    });

    return NextResponse.json("Initiated Chat", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
