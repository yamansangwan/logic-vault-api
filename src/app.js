const express = require("express")
const cookie = require("cookie-parser")
const app = express()
const cors = require("cors")

const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://logic-vault-client.vercel.app/"], 
    credentials: true // For cookies
}));

app.use(express.json())
app.use(cookie())
app.use("/api/auth" , authRouter)
app.use("/api/post" , postRouter)

module.exports = app
