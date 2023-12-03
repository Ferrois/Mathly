import prisma from "@/libs/prismadb";

export async function contactsArr(session, excludeSelf = false) {
  const array = await prisma.conversation
    .findMany({
      where: {
        membersId: { has: session.user.id },
      },
      select: {
        membersId: true,
      },
    })
    .then((conversations) => conversations.flatMap((members) => [...members.membersId]));

  if (excludeSelf) {
    return array.filter((id) => id !== session.user.id);
  } else{
    return array
  }


}
