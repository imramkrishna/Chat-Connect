import storage from "./storage";
import multer from "multer";
import fileFilter from "./fileFilter";
const upload =multer({
    storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5 // 5MB limit
    }
});
export default upload;