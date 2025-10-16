import storage from "./storage";
import multer from "multer";

const upload =multer({storage});

export default upload;