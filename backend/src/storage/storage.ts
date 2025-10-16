import multer from 'multer';
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // Get the file extension from original filename
        const ext = path.extname(file.originalname); // e.g., ".jpg", ".png", ".mp4"
        const nameWithoutExt = path.basename(file.originalname, ext); // e.g., "photo"
        
        // Create unique filename with timestamp and original extension
        const uniqueName = `${file.fieldname}-${Date.now()}-${nameWithoutExt}${ext}`;
        // Example: "uploaded_file-1729123456789-photo.jpg"
        
        cb(null, uniqueName);
    }
})
export default storage
