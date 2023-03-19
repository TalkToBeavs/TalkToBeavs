import mongoose from 'mongoose'
import User from '../User/User.js'

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Number,
            required: false,
            default: 0,
        },
        downvotes: {
            type: Number,
            required: false,
            default: 0,
        },
        postedBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
