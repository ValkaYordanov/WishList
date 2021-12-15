import mongoose from "mongoose";

const wishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  externalLink: {
    type: String,
  },
  vote: Number,
  received: { type: Boolean },
  comments: [{
    content: { type: String, required: true },
    submitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: Date
  }],


},
  { timestamps: true });

const Wish = mongoose.model("Wish", wishSchema);


export default Wish;
