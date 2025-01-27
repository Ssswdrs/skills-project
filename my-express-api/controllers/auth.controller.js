import services from '../services/auth.js';
/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const auth = async (req, res) => {
    try {
        console.log("====>", req)
        const token = await services.auth(req.body);
        res.status(200).json(token);
    } catch (error) {
        console.error('Error fetching token:', error);
        res.status(400).json({ error: 'Failed to fetch token' });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = await services.refreshToken(req.body);
        res.status(200).json(token);
    } catch (error) {
        console.error('Error fetching refresh token:', error);
        res.status(400).json({ error: 'Failed to fetch refresh token' });
    }
}

