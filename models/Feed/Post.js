import mongoose from 'mongoose'
import User from '../User/User.js'

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Array,
            required: false,
            default: [],
        },
        downvotes: {
            type: Array,
            required: false,
            default: [],
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
