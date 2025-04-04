const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/stankay_donation_database'; // Replace with your MongoDB URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;