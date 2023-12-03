import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { contactsArr } from "@/libs/helper/contactsArr";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export default async function SideBarContacts() {
  const session = await getServerSession(authOptions);
  const contactIds = await contactsArr(session, true);
  const users = await prisma.user.findMany({
    where: { id: { in: contactIds } },
    select: { name: true, username: true, role: true, subject: true, type: true, id: true },
  });

  return <div className="flex flex-col w-full overflow-y-auto">{JSON.stringify(users)}</div>;
}
