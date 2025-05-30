import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import errorHandler from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const _dirname = path.resolve();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined')); // Logs requests in a combined format

// Security Middleware with CSP configuration to allow Cloudinary
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
        connectSrc: ["'self'", "https://api.cloudinary.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https: data:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google.com/recaptcha/", "https://www.gstatic.com/recaptcha/"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        frameSrc: ["https://www.google.com/recaptcha/"]
      },
    },
  })
);

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://thekarm.onrender.com' 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error Handling Middleware
app.use(errorHandler);

// Serve Static Files for Frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Catch-all route for SPA
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Start Server and Connect to DB
const PORT = process.env.PORT || 3000;

// Connect to database before starting server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
