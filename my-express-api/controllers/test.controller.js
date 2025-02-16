import services from '../services/test.js';

/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const test = async (req, res) => {
  try {
    const users = await services.test();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const test2 = async (req, res) => {
  try {
    const users = await services.test2(req.body);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const test3 = async (req, res) => {
  try {
    const { id } = req.params
    const users = await services.test3(id);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Get all users.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const test4 = async (req, res) => {
  try {
    const users = await services.test4();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const test5 = async (req, res) => {
  try {
    const response = await services.test5(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

