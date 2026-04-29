const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");

// Import Database 
const { connectDB } = require("./config/db");


const User = require("./models/User"); 

// Import Routes
const tourRoutes = require("./routes/tourRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const visaRoutes = require("./routes/visaRoutes");
const airTicketRoutes = require("./routes/airTicketRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const faqRoutes = require("./routes/faqRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const settingRoutes = require("./routes/settingRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static Files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Seeding Function ---
const seedAdmin = async () => {
  try {
    const userCount = await User.count();
    
    if (userCount === 0) {
      console.log("🌱 Database is empty. Creating default admin user...");
      
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      await User.create({
        name: "Super Admin",
        email: "admin@agency.com",
        password: hashedPassword,
        role: "Super Admin",
        status: "Active"
      });
      
      console.log("✅ Default Admin Created! (Email: admin@agency.com, Pass: admin123)");
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

// Base Route
// app.get("/", (req, res) => {
//   res.send("Travel Agency API is running...");
// });

// --- Routes ---
app.use("/api/tours", tourRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/airtickets", airTicketRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// ২. সব রিকোয়েস্ট index.html এ পাঠানো
app.get(/\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// --- Server Startup and Database Connection ---
const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => { 
    await seedAdmin(); 

    // ২. তারপর সার্ভার লিসেন করবে
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
    process.exit(1); 
  });