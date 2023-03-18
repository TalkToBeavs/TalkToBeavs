import mongoose from 'mongoose'
import Post from '../Feed/Post.js'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    posts: {
        type: [Post.Schema],
        default: [],
    },
    online: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model('User', userSchema)

export default User
