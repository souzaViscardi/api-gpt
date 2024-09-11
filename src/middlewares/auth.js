import Jwt from "../services/Jwt"

export default (req,res,next) => Jwt.verifyJWT(req,res,next)