const jwt = require('jsonwebtoken');
const config = require('../../config/jwt');

const User = require('../../models/UserModel');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: 'NOT_FOUND_TOKEN'
            });
        } 

        const arrayAuth = authHeader.split(' ');
        if (arrayAuth.length != 2 || arrayAuth[0] != 'Bearer') {
            return res.status(401).json({
                success: false,
                error: 'NOT_FOUND_TOKEN'
            });
        }
        
        const token = arrayAuth[1];
        req.bearerToken = token;

        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err){
                let error;
                switch(err.name){
                    case 'TokenExpiredError':
                        error = 'TOKEN_EXPIRED';
                        break;
                    default:
                        error = 'INVALID_TOKEN';
                        break;
                }

                return res.status(401).json({
                    success: false,
                    error
                });
            }

            // BÖYLE BİR KULLANICININ OLUP OLMADIĞINI KONTROL ET.
            const id = decoded._id;

            const userExists = await User.any({ _id: id });
            if (!userExists) {
                return res.status(401).json({
                    success: false,
                    error: 'NOT_FOUND_USER'
                });
            }

            req.bearerToken = token;
            req.tokenInfo = decoded;
            req._id = id;
            next();
        });
    } catch(e) {
        console.log(e);
        return res.status(401).json({
            success: false
        });
    }
}
