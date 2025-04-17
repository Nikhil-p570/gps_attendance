// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// const authRoutes = require('./routes/auth');
// dotenv.config();

// const app = express();

// // ✅ Proper CORS setup
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// app.use(express.json());

// // ✅ Mount routes
// app.use('/api/auth', authRoutes); // only one route mount

// // ✅ MongoDB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
