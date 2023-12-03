import prisma from "@/libs/prismadb"

export async function friendIdArr(session,excludeSelf = false) {
  const array = await prisma.friendship
    .findMany({
      where: {
        OR: [{ fromUserId: session.user.id }, { toUserId: session.user.id }],
        status: "accepted",
      },
      select: {
        fromUserId: true,
        toUserId: true,
      },
    })
    .then((friendships) => friendships.flatMap((friendship) => [friendship.fromUserId, friendship.toUserId]));

  if (excludeSelf) {
    array.filter((id) => id !== session.user.id);
  }

  return array;
}
