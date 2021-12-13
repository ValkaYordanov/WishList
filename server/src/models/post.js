import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  owner: {
    type: String,
  },
  authorName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  likes: Number,
  comments: [{
    userName: { type: String, required: true, maxLength: 100 },
    content: { type: String, required: true, minLength: 2 }
  }],
  date: Date,
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);


export default Post;
