import multer, {Multer} from "multer"
import {FileUploadMessage} from "../utils/types";
const uploadMulter=(messageDetails:FileUploadMessage)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${messageDetails.roomId}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
    const upload:Multer = multer({ storage: storage })
    return upload;
}
export default uploadMulter