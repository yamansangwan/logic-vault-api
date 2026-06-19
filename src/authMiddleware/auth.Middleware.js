const jwt = require("jsonwebtoken")

async function verifyToken (req , res , next){

try{
   const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({ message : "Unauthorized" })
    }

    const decoded = jwt.verify(token , process.env.SECRET_KEY)
 // d1 
    req.userId = decoded.id

    next()

} catch(error){
    return res.status(401).json({ message : "Invalid Token" })
}

}

module.exports = verifyToken