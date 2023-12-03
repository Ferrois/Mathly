// import { addFriendValidator } from "@/libs/validations/add-friend";
// import prisma from "@/libs/prismadb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     const body = await req.json();
//     const session = await getServerSession(authOptions);

//     const requestList = await prisma.users.findMany({
//       take: 10,
//       step: 1,
//       order: { createdAt: "desc" },
//       where: {
//         toUserId: session.user.id,
//       },
//     });

//     return new NextResponse("Testing", { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse("Something went wrong", { status: 500 });
//   }
// }
