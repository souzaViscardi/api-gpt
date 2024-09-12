import { Router } from "express";
import GptService from "../services/Gpt";
import { validateSchema } from "../middlewares/validateSchema.js";

let gptIterations = Router()
/**
 * @openapi
 * tags:
 *   name: GPT Iterations
 *   description: Operações relacionadas a interações com GPT
 */

/**
 * @openapi
 * /:
 *   post:
 *     summary: Cria uma interação com GPT
 *     tags: [GPT Iterations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               message:
 *                 type: string
 *                 example: Olá, como você está?
 *             required:
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Resposta do GPT criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Simulated response from GPT"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
gptIterations.post("/",validateSchema('gpt-iteration'), async (req, res) => {
    let data = req.body
    const gpt = new GptService()
    let response = await gpt.simpleAsk(data)
    res.status(201).json(response)
})


export default gptIterations