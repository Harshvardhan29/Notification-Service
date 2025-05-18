// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const notificationRoutes = require('./routes/notificationRoutes');

// // const app = express();
// // app.use(express.json());

// // app.use('/api/notifications', notificationRoutes);

// // const PORT = process.env.PORT || 3000;

// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => {
// //     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// //   })
// //   .catch(err => console.error('❌ MongoDB connection failed:', err));

// //   // Existing POST route
// // app.post('/api/notifications/send', async (req, res) => {
// //   // ... your existing logic here
// // });

// // // ✅ Add the new GET route just below it
// // app.get('/api/users/:id/notifications', async (req, res) => {
// //   try {
// //     const notifications = await Notification.find({ userId: req.params.id });
// //     res.json(notifications);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to fetch notifications' });
// //   }
// // });

// // app.js
// // POST /api/notifications/send
// const Notification = require('./models/Notification');
// const notificationsRoute = require('./routes/notifications');
// app.use('/api', notificationsRoute);

// app.post('/api/notifications/send', async (req, res) => {
//   try {
//     const { userId, message, type } = req.body;

//     if (!userId || !message || !type) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const notification = new Notification({ userId, message, type });
//     await notification.save();

//     console.log(`📩 ${type} notification for User(${userId}): ${message}`);

//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to send notification' });
//   }
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Notification = require('./models/Notification'); // Make sure this path is correct

// dotenv.config();
// const app = express();
// app.use(express.json());

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)

//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // ✅ POST /api/notifications/send
// app.post('/api/notifications/send', async (req, res) => {
//   try {
//     const { userId, message, type } = req.body;

//     if (!userId || !message || !type) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const notification = new Notification({ userId, message, type });
//     await notification.save();

//     console.log(`Simulating ${type} notification...`);

//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to send notification' });
//   }
// });

// // ✅ GET /api/users/:id/notifications
// app.get('/api/users/:id/notifications', async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.id });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch notifications' });
//   }
// });

// // ✅ Start the server
// app.listen(3000, () => {
//   console.log('✅ Server running on port 3000');
// });

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/notificationsDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

app.post("/notifications", async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: "Title and message are required" });
    }
    const notification = new Notification({ title, message });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
