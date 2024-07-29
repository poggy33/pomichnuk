import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    // unique: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: String,
    default: "0",
  },
  countRate: {
    type: String,
    default: "0",
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
