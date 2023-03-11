import mongoose from "mongoose";
import User from "../User/User";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    downvotes: {
      type: Number,
      required: true,
    },
    postedBy: User,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
