import  jwt  from 'jsonwebtoken'

class Jwt{
    constructor(payload){
        this.payload = payload || {id: process.env.ID}
        this.secret = process.env.SECRET
    }
    verifyJWT(req, res, next){
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.userId = decoded.id;
          next();
        });
    }
    
     async getToken()  {
        try {    
            const token = await jwt.sign(this.payload, this.secret);
            return token
         } catch (error) {
            console.log("ERROR", error)
             throw new Error(`Error in generate token: ${error.message}`);
             
         }
     }
}

export default  new Jwt()