import express from "express";
import Wish from "../models/wish.js";

const wishRoutes = express.Router();

wishRoutes.get("/", async (req, res) => {
  const posts = await Wish.find().sort({ vote: 'desc', createdAt: 'desc' }).populate({
    path: 'comments.submitter',
    model: 'User'
  }).exec()
  res.json(posts);
});



wishRoutes.post("/create", async (req, res) => {
  try {
    const wish = await Wish.create(req.body);
    res.status(201);
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Wish could not be created",
      details: error.toString(),
    });
  }
});

wishRoutes.delete("/deleteWish/:id", async (req, res) => {
  try {
    const wish = await Wish.findByIdAndRemove(req.params.id);
    res.status(201);
    const wishes = await Wish.find();
    res.json(wishes);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Wish could not be created",
      details: error.toString(),
    });
  }
});


wishRoutes.put('/incrementVote/:id', async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    wish.vote++;
    wish.save();
    res.status(201);
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Vote can not be incremented!",
      details: error.toString(),
    });
  }
});

wishRoutes.put('/decrementVote/:id', async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    wish.vote--;
    wish.save();
    res.status(201);
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Vote can not be decremented!",
      details: error.toString(),
    });
  }
});

wishRoutes.put('/makeUnreceived/:id', async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    wish.received = false;
    wish.save();
    res.status(201);
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Wish could not be unreceived!",
      details: error.toString(),
    });
  }
});

wishRoutes.put('/makeReceived/:id', async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    wish.received = true;
    wish.save();
    res.status(201);
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Wish could not be received!",
      details: error.toString(),
    });
  }
});

wishRoutes.put('/addComment/:id', async (req, res) => {
  try {
    const wish = await Wish.findByIdAndUpdate({ _id: req.params.id },
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
    res.json(wish);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Wish could not be comment",
      details: error.toString(),
    });
  }
});

wishRoutes.get("/:id", async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id).populate("submitter");
    if (wish) {
      res.json(wish);
    } else {
      res.status(404);
      res.json({ error: "Wish not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

export default wishRoutes;
