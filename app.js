const express = require('express');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

app.post('/register', userController.register);

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Donation Platform API'));

app.listen(3000, () => {
  console.log(`Server running on port 3000`);

});