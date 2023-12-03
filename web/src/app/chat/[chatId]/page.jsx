import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StartConversaton from "@/components/Chat/StartConversation/StartConversation";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import { messageArrayValidator } from "@/libs/validations/message";
import SideBarContacts from "@/components/Chat/Sidebar/SideBarContacts";

async function getChatMessages(session, chatId) {
  try {
    const dbMessages = await prisma.message.findMany({
      take: 10,
      skip: 0,
      where: { id: chatId },
      orderBy: { createdAt: "desc" },
    });

    const messages = messageArrayValidator.parse(dbMessages);

    return messages;
  } catch (err) {
    console.log(err, "----getChatMessages");
  }
}

async function getUser(session, chatId) {
  // Only private conversations
  try {
    const { membersId } = await prisma.conversation.findUnique({ where: { id: chatId }, select: { membersId: true } });
    const userId = membersId[0] !== session.user.id ? membersId[0] : membersId[1];
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, username: true, image: true, role: true, type: true, subject: true },
    });
    return user;
  } catch (err) {
    console.log(err, "----getUser");
  }
}

export default async function Chat({ params }) {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const receiver = await getUser(session, chatId);
  const messages = await getChatMessages(session, chatId);

  return (
    <div className="flex w-full flex-col items-center flex-1">
      <div className="w-full h-full lg:w-11/12 m-2 flex border-2 border-gray-100 shadow-md rounded-md">
        <div className="w-1/4 h-full  rounded-l-md border-r-[1px] border-gray-200">
          <StartConversaton />
          {/* {params.chatId} */}
          <SideBarContacts />
        </div>

        <div className="flex-1 h-full bg-red-400 flex flex-col rounded-r-md">
          <div className="w-full h-10 bg-blue-500 rounded-r-md"></div>
          <div className="flex-1 flex w-full justify-center">
            <div className="w-3/4 h-full ">
              {/* Main Chat section */}
              {JSON.stringify(messages)}
              {JSON.stringify(receiver)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
