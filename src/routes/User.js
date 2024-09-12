
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import UserService from "../services/User.js";

let users = Router()

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - phone
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 */
users.post("/",validateSchema('new-user'), async (req, res) => {
    try {
        let user = new UserService()
        let response = await user.createUser(req.body);
        res.status(201).send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }

})


export default users