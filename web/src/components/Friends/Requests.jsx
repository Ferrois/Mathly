import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import AcceptFriend from "./AcceptFriend";

export default async function Requests() {
  const session = await getServerSession(authOptions);
  const requestList = await prisma.friendship.findMany({
    take: 10,
    skip: 0,
    orderBy: { createdAt: "desc" },
    where: {
      toUserId: session.user.id,
    },
  });

  let userList = [];

  for (let elem of requestList) {
    const user = await prisma.user.findUnique({ where: { id: elem.fromUserId } });
    user.friendshipId = elem.id;
    user.requestStatus = elem.status;
    userList.push(user);
  }

  return (
    <div className="flex w-full">
      {/* {JSON.stringify(userList)} */}
      {userList &&
        userList.map(({ friendshipId, name, username, image, type, requestStatus }) => {
          return (
            <div key={friendshipId}>
              <p>
                {name},{requestStatus}
              </p>
              <AcceptFriend friendshipId={friendshipId}/>
            </div>
          );
        })}
    </div>
  );
}
