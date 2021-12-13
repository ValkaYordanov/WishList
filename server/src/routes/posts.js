import express from "express";
import Post from "../models/post.js";
import User from "../models/user.js";

const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  const posts = await Post.find().populate('submitter').exec();

  // posts.forEach(post => {
  //   post.populate('submitter')

  // });
  res.json(posts);
});



postRoutes.post("/create", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be created",
      details: error.toString(),
    });
  }
});

postRoutes.delete("/deletePost/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(201);
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be created",
      details: error.toString(),
    });
  }
});

// postRoutes.route('/addLike/:id').put((req, res, next) => {
//   try{
//     const post = await Post.findByIdAndUpdate(req.body.id);
//     $set:req.body
//   }
//   post.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Student updated successfully !')
//     }
//   })
// })

postRoutes.put('/addLike/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("submitter");
    post.likes++;
    post.save();
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be liked",
      details: error.toString(),
    });
  }
});

//lifting state up to the parrent for adding comment and update the page


postRoutes.put('/addComment/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate({ _id: req.params.id },
      {
        // $push: { comments: { ...req.body, username: req.user.username } }
        $push: { comments: req.body }
      },
      {
        returnDocument: 'after'
      }

    );
    // post.comments = [{ ...post.comments }, [req.body]];
    // post.save();
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be comment",
      details: error.toString(),
    });
  }
});

postRoutes.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("submitter");
    if (post) {
      res.json(post);
      console.log(post.populated('submitter'))
      console.log("fasdasd")
    } else {
      res.status(404);
      res.json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

export default postRoutes;
