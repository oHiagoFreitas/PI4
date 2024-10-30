// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config'); // Caminho ajustado para acessar o config

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove a palavra ‘Bearer ’
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'O token não é válido.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'Token indisponível.'
        });
    }
};

module.exports = {
    checkToken: checkToken
};
