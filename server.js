require("dotenv").config()

const app = require("./src/app")

const connectDB = require("./src/database/db")
connectDB()

app.listen(3000 , () => console.log("backend server is running") )