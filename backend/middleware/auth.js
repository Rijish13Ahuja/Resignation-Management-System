const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles) => async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user || !roles.includes(user.role)) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

module.exports = auth;