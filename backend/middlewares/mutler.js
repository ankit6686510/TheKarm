import multer from "multer";

const storage = multer.memoryStorage();

// Middleware for a single file upload
export const singleUpload = multer({ storage }).single("file");

// Middleware for multiple file uploads with different field names
export const multipleUploads = multer({ storage }).fields([
  { name: 'resumeFile', maxCount: 1 },
  { name: 'profilePhotoFile', maxCount: 1 }
]);