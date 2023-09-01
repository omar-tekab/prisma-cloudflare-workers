
import PrismaEdge from "@prisma/client/edge"
const { PrismaClient } = PrismaEdge

import fs from 'fs'
const prisma = new PrismaClient();

export let userList = (JSON.parse(fs.readFileSync('/workspace/prisma-cloudflare-workers/prisma/seed-generated-output/data/User/User.json', 'utf-8')))["User"]

export const addUserSeedData = async() => {
    try {
        for (let i = 0; i < userList.length; i++) {
            await prisma.user.upsert({
                where: {
                    id: userList[i].id,
                },
                update: userList[i],
                create: userList[i],
            })

        }
    } catch (error: any) {
        console.log("Error pushing to: User")
        console.log("Error:", error)
    }

}