import { Request } from "express";
import multer from "multer";
import path from "path";
function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        // Optional: Filter allowed file types
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
        }
    }

export default fileFilter;
