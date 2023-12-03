import {z} from "zod"

// model Message {
//     id             String @id @default(auto()) @map("_id") @db.ObjectId
//     text           String
//     fromUserId     String @db.ObjectId
//     conversationId String @db.ObjectId
  
//     fromUser     User         @relation(fields: [fromUserId], references: [id])
//     conversation Conversation @relation(fields: [conversationId], references: [id])
//   }
  

export const messageValidator = z.object({
    id:z.string(),
    conversationId: z.string(),
    fromUserId: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const messageArrayValidator = z.array(messageValidator)
