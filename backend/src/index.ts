import http from "http"
import {WebSocketServer} from "ws"
import ChatManager from "./ChatManager/ChatManager";
import express from "express";
import upload from "./storage/upload";
import {STATUSCODE} from "./utils/message";
import path from "path"
import fs from "fs"
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());

const server=app.listen(8000,()=>{
    console.log("Server is running on port 8000")
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const wss = new WebSocketServer({ server })
const chatManager = new ChatManager()

wss.on("connection", (ws) => {
    console.log("New Connection Established.")
    chatManager.messageHandler(ws)

    ws.on("close", () => {
        console.log("Connection Closed.")
    })

    ws.on("error", (err) => {
        console.log("Error in the websocket.", err)
    })
})

app.get("/", (req, res) => {
    res.send("Server is running for chat connect.")
})

// Serve static files from uploads directory - FIXED PATH
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'), {
    setHeaders: (res, filePath) => {
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
}));


app.post("/upload", upload.single("uploaded_file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(STATUSCODE.BAD_REQUEST).json({
                error: "No file uploaded"
            });
        }

        console.log("File uploaded \n", req.file);

        res.status(STATUSCODE.SUCCESS).json({
            message: "File uploaded successfully",
            file: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path,
                url: `http://localhost:8000/uploads/${req.file.filename}` // Add full URL
            }
        });
    } catch (e) {
        console.log("Error in file upload", e);
        res.status(STATUSCODE.SERVER_ERROR).json({
            error: "Error in file upload"
        });
    }
})