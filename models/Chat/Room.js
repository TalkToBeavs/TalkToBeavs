import mongoose from 'mongoose'
import User from '../User/User.js'

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    users: {
        type: [String],
        required: true,
    },

    messages: {
        type: [String],
        required: true,
    },
    isVideo: {
        type: Boolean,
        required: true,
    },
})

const Room = mongoose.model('Room', roomSchema)

export default Room
