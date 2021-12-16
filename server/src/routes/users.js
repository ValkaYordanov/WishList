import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

async function hashPass(rawPass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(rawPass, 10, function (err, hash) {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}


export function createUsersRouter(secret) {
    const router = express.Router();


    router.get("/users", async (req, res) => {
        const users = await User.find();
        res.json(users);
    });

    router.post("/registration", async (req, res) => {
        try {
            const pass = await hashPass(req.body.password);
            const user = await User.create({ username: req.body.username, type: "visitor", password: pass });
            const payload = { user };
            const token = jwt.sign(payload, secret, {
                algorithm: "HS512",
                expiresIn: "1h",
            });
            res.status(201);
            res.json({
                msg: `User '${user.username}' was created `,
                token: token,
            });
        } catch (error) {
            res.status(500);
            res.json({
                error: "User could not be created",
                details: error.toString(),
            });
        }

    });


    router.post("/authenticate", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({ msg: msg });
            return;
        }

        const user = await User.findOne({ username: username });


        if (user) {

            if (bcrypt.compareSync(password, user.password)) {
                const payload = { user };
                const token = jwt.sign(payload, secret, {
                    algorithm: "HS512",
                    expiresIn: "1h",
                });

                res.json({
                    msg: `User '${username}' authenticated successfully`,
                    token: token,
                });
            } else {
                res.status(401).json({ msg: "Password mismatch!" });
            }
        } else {
            res.status(404).json({ msg: "User not found!" });
        }
    });


    return router;
}
