const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
        }

        const token = header.split(' ')[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded) {
            req.user = decoded;
            console.log(decoded);
            next();
        }
      
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }
};

module.exports = verifyToken;
