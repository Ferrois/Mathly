import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { friendIdArr } from "@/libs/helper/friendIdArr";

export async function POST(req) {
  try {
    const body = await req.json();
    const { search } = body;
    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorised", { status: 401 });

    const friendIds = await friendIdArr(session, true);

    const userArr = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                username: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            id: {
              in: friendIds,
              not: session.user.id,
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        type: true,
        subject: true,
      },
    });

    return NextResponse.json(userArr, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
