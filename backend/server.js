require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resignationRoutes = require('./routes/resignations');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3002', // Match frontend port
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create HR user if not exists
const seedHrUser = async () => {
  if (!await User.findOne({ username: 'admin' })) {
    await User.create({
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      role: 'hr',
      country: 'Company',
      email: 'hr@company.com'
    });
    console.log('HR user created');
  }
};
seedHrUser();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resignations', resignationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));