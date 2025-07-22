 
 const jwt = require("jsonwebtoken");
 
 
async function generateJwtToken (email) {

        const jwtToken = await jwt.sign({email}, process.env.JWT_SECRET || "secret", {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours 
        })

   

        return jwtToken
    };



    

    module.exports = generateJwtToken;