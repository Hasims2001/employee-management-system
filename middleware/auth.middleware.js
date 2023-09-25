const jwt = require("jsonwebtoken");
require("dotenv").config();


const auth = (req, res, next) =>{
    let token = req.headers.auth;
    if(token){
        try {
            jwt.verify(token, process.env.VERIFY_KEY,  (err, decoded) =>{
                if(err){
                    res.send({issue : true, msg : "token is Invalid, Login again."})  
                }
                let obj = {
                    ...req.body,
                    userId : decoded.id,
                    email: decoded.email
                }
                req.body = obj;
                next();

              })
        } catch (error) {
            res.send({issue : true, msg : error.message})  
        }
    }else{
        res.send({issue : true, msg : "token not found, Login again."})
    }
}
module.exports ={
    auth
}