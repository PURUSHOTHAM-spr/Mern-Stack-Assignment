import multer from "multer";
import path from "path";

// Store files in memory as Buffer (for saving to DB or cloud later)
const storage = multer.memoryStorage();

// File filter: only allow JPEG and PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG images are allowed"), false);
  }
};

// Max file size: 2MB
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
