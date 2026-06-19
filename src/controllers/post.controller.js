// posting logics

const postModel = require("../models/post.model")

const uploadFileBuffer = require("../services/post.services")

async function createPost(req, res) {

        const { title , note, category, status, todo } = req.body

        let fileUrl = "";
        let fileName = "";
        let fileType = "";

        if(req.file){
            const response = await uploadFileBuffer(req.file.buffer , req.file.ogName)
            fileName = req.file.ogName;
            fileUrl = response.url;
            fileType = req.file.mimetype;
        }

        const newPost = await postModel.create({
            title, note , category, status, todo , user: req.userId , fileUrl , fileName , fileType
        })
    

        res.status(201).json({
            message : "Post Created Successfully",
            post : newPost
        })

        
}

async function updatePost(req, res) {

//    const { title , note, category, status, todo } = req.body

   const updatedPost = await postModel.findOneAndUpdate(
    { _id : req.params.id , user : req.userId}, {
    title: req.body.title,
    note: req.body.note,
    category: req.body.category,
    status: req.body.status,
   })

    res.status(200).json({
        message: "Post Updated Successfully",
        post: updatedPost
    });

}

async function deletePost(req, res) {
    // await postModel.findByIdAndDelete({ _id: req.params.id })
    const deletedPost = await postModel.findOneAndDelete(
        { _id : req.params.id , user: req.userId })

    // console.log(deletedPost)

    res.status(200).json({
        message: "Post Deleted Successfully",
    }
)
}


async function getPosts(req , res) {
    const fetchedPosts = await postModel.find({user : req.userId})
    res.status(200).json({
        message : "fetched posts",
        posts : fetchedPosts
    })
} 

module.exports = { createPost, updatePost, deletePost, getPosts }