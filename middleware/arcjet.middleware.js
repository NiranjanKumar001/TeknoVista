import aj from '../config/arcjet.js';

//arcjet for the middleware for too many requests and bot detection

const arcjetMiddleware = async(req, res, next) => {
    try {
        const decision =await aj.protect(req,{requested:1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({message:'Too many requests'});
            if(decision.reason.isBot()) return res.status(401).json({message:'Bot detected'});

            return res.status(403).json({error:'Access Denied'});
        }
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`); // string interpolation
        next(error);
    }
}
// this is for the arcjet middleware
export default arcjetMiddleware;