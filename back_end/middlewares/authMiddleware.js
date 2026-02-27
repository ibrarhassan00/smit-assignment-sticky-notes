import jwt from "jsonwebtoken";

const checkAuth = (request, response, next) => {
    try {

        const token = request?.headers?.authorization?.split(" ")[1];
        const PRIVATE_KEY = "ibrar";

        const decoded = jwt.verify(token, PRIVATE_KEY)
        // console.log("decoded",decoded);
        
        request.user = decoded;
        if(decoded){
            return next()
        }else{
            response.json({
               status: false,
               message: "Auth failed"
            })
        }
 
    } catch (error) {
        response.json({
            status: false,
            message: error.message || "Auth failed"
        })
    }
}

export default checkAuth;