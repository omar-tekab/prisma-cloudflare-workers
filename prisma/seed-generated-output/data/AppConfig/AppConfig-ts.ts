
import PrismaEdge from "@prisma/client/edge"
const { PrismaClient } = PrismaEdge

import fs from 'fs'
const prisma = new PrismaClient();

export let appConfigList = (JSON.parse(fs.readFileSync('/workspace/prisma-cloudflare-workers/prisma/seed-generated-output/data/AppConfig/AppConfig.json', 'utf-8')))["AppConfig"]

export const addAppConfigSeedData = async() => {
    try {
        for (let i = 0; i < appConfigList.length; i++) {
            await prisma.appConfig.upsert({
                where: {
                    id: appConfigList[i].id,
                },
                update: appConfigList[i],
                create: appConfigList[i],
            })

        }
    } catch (error: any) {
        console.log("Error pushing to: AppConfig")
        console.log("Error:", error)
    }

}