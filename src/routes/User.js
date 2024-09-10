import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import UserService from "../services/User.js";

let users = Router()

users.post("/",validateSchema('new-user'), async (req, res) => {
    try {
        let user = new UserService()
        let response = await user.createUser(req.body);
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }

})


export default users