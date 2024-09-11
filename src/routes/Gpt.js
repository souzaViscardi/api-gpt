import { Router } from "express";
import GptService from "../services/Gpt";
import { validateSchema } from "../middlewares/validateSchema.js";

let gptIterations = Router()

gptIterations.post("/",validateSchema('gpt-iteration'), async (req, res) => {
    let data = req.body
    const gpt = new GptService()
    let response = await gpt.simpleAsk(data)
    res.status(201).json(response)
})


export default gptIterations