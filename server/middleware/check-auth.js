const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,'iusecrazystring');
        req.userData = decoded;
        next();
    }
    catch(e){
        return res.status(401).send({message:"You are not logged in. Please login to perform this action!"});
    }
}
