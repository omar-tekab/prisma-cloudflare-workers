
import { PrismaClient } from "@prisma/client/edge";
import fs from 'fs'

import { withAccelerate } from '@prisma/extension-accelerate'


const prisma = new PrismaClient().$extends(withAccelerate())

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