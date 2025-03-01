
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const jwtValidate = (req, res, next) => {
    try {
        if (!req.headers["authorization"]) return res.sendStatus(401)

        const token = req.headers["authorization"].replace("Bearer ", "")
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) throw new Error(err)
        })
        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}

export const jwtRefreshTokenValidate = (req, res, next) => {
    try {
        if (!req.body?.refreshToken) return res.sendStatus(401)
        const token = req.body.refreshToken
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) throw new Error(err)

            req.user = decoded
            req.user.token = token
            delete req.user.exp
            delete req.user.iat
        })
        next()
    } catch (error) {
        console.error(error)
        return res.sendStatus(403)
    }
}

export const jwtValidateSocket = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error('No token provided')); // Return early with a meaningful error message
        }

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Invalid token')); // Return error if token is invalid
            }

            socket.user = decoded; // Store user data on the socket object
            next(); // Proceed with the connection
        });
    } catch (error) {
        console.error('WebSocket Authentication Error:', error.message);
        next(new Error('Authentication error')); // Handle any other errors
    }
};