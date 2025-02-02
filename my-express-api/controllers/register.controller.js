import services from '../services/register.js';


/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const register = async (req, res) => {
  try {
    const users = await services.register(req.body);
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching register users:', error);
    res.status(500).json({ error: 'Failed to fetch register users' });
  }
};