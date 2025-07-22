const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
     const authHeader = req.headers.authorization;
     let token = ''
     if (authHeader && authHeader.startsWith('Bearer ')) {
 
  token = authHeader.split(' ')[1];

}
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "secret", function (err, decoded) {
        if (err) {
            return res.status(401).json({ error: JSON.stringify(err) });
        }
        req.user = decoded
        next()
    })

}

module.exports = authentication