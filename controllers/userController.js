const User = require('../models/user');

const userController = {
  async register(req, res) {
    const { name, email, role } = req.body;
    try {
        if(!name || !email){
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const user = await User.createUser({ name, email, role });

     res.status(201).json({ message: 'User registered.', user: { id: user.id, email } });
} catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  res.status(500).json({ error: 'Failed to register user', details: error.message });
}
    
  },
    
};

module.exports = userController;