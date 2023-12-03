import prisma from "@/libs/prismadb";

export async function getFriendship(usersArr) {
  let friendship = await prisma.friendship.findUnique({
    where: {
      fromUserId_toUserId: {
        fromUserId: usersArr[0],
        toUserId: usersArr[1],
      },
    },
  });

  if (!friendship) {
    friendship = await prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: usersArr[1],
          toUserId: usersArr[0],
        },
      },
    });
  }

  return friendship || null;
}
