const express = require("express")
const verifyToken = require("../authMiddleware/auth.Middleware")
const postRouter = express.Router()
const upload = require("../authMiddleware/multer.Middleware")

const postController = require("../controllers/post.controller")

postRouter.post("/create" ,verifyToken, upload.single("file"), postController.createPost)
postRouter.post("/update/:id" , verifyToken, postController.updatePost)
postRouter.delete("/delete/:id" , verifyToken, postController.deletePost)
postRouter.get("/get" , verifyToken, postController.getPosts)


module.exports = postRouter
