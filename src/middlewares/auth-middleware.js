const createError = require("../utils/create-errors")
const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
    try {
      // รับ headers จาก CLIENT
      const authorization = req.headers.authorization;
      console.log(authorization);
      // CHECK ถ้าไม่มี token (missing token)
      if (!authorization) {
        createError(400, "Authentication required"); 
      }
      const token = authorization.split(" ")[1];
      
      // verify token
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(err);
        console.log(decoded);
        
        if (err) {
          createError(401, "Unauthorized");
        }
        
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error); 
    }
  };