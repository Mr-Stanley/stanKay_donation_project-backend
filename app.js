require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const donorRoutes = require('./routes/donorRoutes');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(express.json());

const fakeAuth = (req, res, next) => {
    req.user = { _id: 'fakeUserId123', role: 'donor' }; // Default donor for testing
    next();
  };
  app.use(fakeAuth);


app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donor', donorRoutes);

app.get('/', (req, res) => res.send('Donation Platform API'));

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();