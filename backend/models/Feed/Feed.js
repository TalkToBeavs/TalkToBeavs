import mongoose from "mongoose";
import Post from "./Post";

const feedSchema = new mongoose.Schema({
  posts: {
    type: [Post.schema],
    required: true,
  },
});

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;
