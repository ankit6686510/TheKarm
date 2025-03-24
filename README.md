# Karm - Job Portal Platform
# live link: https://thekarm.onrender.com

## Project Overview

Karm is a comprehensive job portal platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It serves as a bridge connecting job seekers with employers, facilitating the entire recruitment process from job posting to application management.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Security Measures](#security-measures)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

### For Job Seekers
- User registration and profile creation
- Resume upload and management
- Job search with advanced filtering options
- Job application tracking
- Application status monitoring
- Company information browsing

### For Employers/Recruiters
- Company profile creation and management
- Job posting with detailed descriptions
- Applicant management system
- Resume screening
- Application status updates
- Candidate communication

### For Administrators
- User management
- Company verification
- Job posting moderation
- Platform analytics
- Content management

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces
- **Redux Toolkit**: State management solution
- **React Router**: For navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI Components**: Modern UI components
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling (ODM) library
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud storage for images and files

### DevOps & Tooling
- **Git**: Version control
- **npm**: Package management
- **ESLint**: Code linting
- **Render**: Cloud hosting platform

## System Architecture

Karm follows a typical MERN stack architecture:

1. **Client Layer**: React.js frontend with Redux state management
2. **API Layer**: Express.js RESTful API endpoints
3. **Business Logic Layer**: Node.js controllers and services
4. **Data Access Layer**: Mongoose models and MongoDB database

The application implements the following security measures:
- JWT-based authentication
- HTTP security headers (Helmet)
- Rate limiting to prevent abuse
- CORS protection
- Password hashing with Bcrypt

## Installation and Setup

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB instance (local or Atlas)

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/karm.git
   cd karm
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Start the frontend development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

### Full-Stack Development
To run both frontend and backend concurrently:
```bash
# From the root directory
npm run dev
```

## Project Structure

```
KARM/
├── backend/                 # Backend code
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── index.js             # Server entry point
│
├── frontend/                # Frontend code
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Admin/       # Admin-specific components
│   │   │   ├── Applicants/  # Applicant-related components
│   │   │   ├── Companies/   # Company-related components
│   │   │   ├── Jobs/        # Job-related components
│   │   │   └── ...          # Other component directories
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── redux/           # Redux store and slices
│   │   │   ├── applicationSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── companySlice.js
│   │   │   ├── jobSlice.js
│   │   │   └── store.js
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Application entry point
│   ├── index.html           # HTML template
│   └── vite.config.js       # Vite configuration
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## API Documentation

### Authentication Endpoints
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Log in an existing user
- `GET /api/v1/user/logout` - Log out the current user
- `POST /api/v1/user/profile/update` - Update user profile

### Job Endpoints
- `POST /api/v1/job/post` - Create a new job posting
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/getadminjobs` - Get jobs for admin view
- `GET /api/v1/job/get/:id` - Get a specific job by ID

### Company Endpoints
- `POST /api/v1/company/create` - Create a new company
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/get/:id` - Get a specific company by ID

### Application Endpoints
- `POST /api/v1/application/apply` - Submit a job application
- `GET /api/v1/application/getbyuser` - Get applications for current user
- `GET /api/v1/application/getbyjob/:jobId` - Get applications for a specific job
- `PUT /api/v1/application/status/:id` - Update application status

## User Roles and Permissions

### Student (Job Seeker)
- Can create and update profile
- Can search and apply for jobs
- Can track application status
- Can upload and manage resume

### Recruiter
- Can create and manage company profile
- Can post and manage job listings
- Can view and manage applications
- Can communicate with applicants

### Administrator
- Has access to all platform features
- Can manage users, companies, and job postings
- Can view platform analytics
- Can moderate content

## Database Schema

### User Model
- Basic information: fullname, email, phoneNumber, password
- Role: student, recruiter, admin
- Profile: bio, skills, resume, company reference, profile photo

### Company Model
- Basic information: name, description, website, location
- Logo: URL to company logo
- User reference: link to the user who created the company

### Job Model
- Basic information: title, description, requirements, salary
- Job details: experienceLevel, location, jobType, position
- References: company, created_by (user)
- Applications: list of applications for this job

### Application Model
- References: job, applicant (user)
- Status: pending, accepted, rejected
- Resume: URL to resume file
- Application date

### Additional Models
- Skill Model: for tracking and matching skills
- Chat Model: for communications
- Notification Model: for system notifications
- Feedback & Rating Model: for reviews
- Payment & Subscription Models: for premium features
- Audit Model: for system logging
- File Storage Model: for document management

## Deployment

The application is deployed on Render.com with the following setup:

1. **Backend Service**: Node.js web service
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Set in Render dashboard

2. **Frontend**: Static site
   - Build Command: `npm install && npm run build`
   - Publish Directory: `frontend/dist`

3. **Database**: MongoDB Atlas cluster
   - Connected via environment variables

The live application is accessible at: https://thekarm.onrender.com

## Security Measures

- **Authentication**: JWT-based token authentication with access and refresh tokens
- **Password Security**: Bcrypt hashing with appropriate salt rounds
- **API Protection**: Helmet for HTTP headers, rate limiting for abuse prevention
- **Data Validation**: Server-side validation for all inputs
- **CORS Configuration**: Restricted cross-origin resource sharing
- **File Upload Security**: Multer for handling multipart/form-data with size limits
- **Environment Variables**: Sensitive information stored in .env files

## Future Enhancements

- **Advanced Search**: Implementing Elasticsearch for better job search functionality
- **Real-time Notifications**: Socket.io for instant updates
- **AI-powered Matching**: Job recommendation system based on user profiles
- **Video Interviews**: Integration with WebRTC for online interviews
- **Mobile Application**: React Native version for iOS and Android
- **Analytics Dashboard**: Advanced reporting for employers
- **Internationalization**: Multi-language support
- **Accessibility Improvements**: WCAG compliance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 