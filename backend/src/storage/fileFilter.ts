import { Request } from "express";
import multer from "multer";
function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    // Accept only specific file types -> images , pdf , doc,etc
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif','application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed!')); // Reject file
    }
}

export default fileFilter;
