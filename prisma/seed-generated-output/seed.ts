
import { addUserSeedData } from "./data/User/User-ts"
import { addAppConfigSeedData } from "./data/AppConfig/AppConfig-ts"

export const pushSeed = async() => {
    await addUserSeedData()
	await addAppConfigSeedData()

}
pushSeed()
        