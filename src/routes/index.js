import { Router } from "express"
import users from "./User.js"
import gptIterations from "./Gpt.js"
let router = Router()
router.use("/user", users)
router.use("/gpt", gptIterations)

export default router