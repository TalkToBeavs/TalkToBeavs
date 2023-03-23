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
    standing: {
        type: String,
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student'],
        required: false,
    },
    major: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
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
