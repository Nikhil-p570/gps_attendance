// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// ✅ CORS setup (supports cookies)
app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL
  credentials: true,
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);  // All auth-related endpoints like login, register, geofence

const userRoutes = require('./routes/userRoutes'); // (optional)
app.use('/api/users', userRoutes);  // Only if you’ve defined userRoutes

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
