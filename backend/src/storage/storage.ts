import multer from 'multer';
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `uploaded_file-${Date.now()}-${Math.round(Math.random() * 1E8)}`);
    }
});
export default storage
