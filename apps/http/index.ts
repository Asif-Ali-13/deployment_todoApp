import express from "express";
import { prisma } from "@repo/db/client";

const app = express();

app.get("/user", async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json({
        users,
        "message": "all users fetched successfully !" 
    })
})

app.post("/sign-up", async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) 
        return res.status(400).json({
            "message": "username or password is not provided"
        })

    await prisma.user.create({
        data: {
            username,
            password
        }
    });

    return res.status(201).json({
        "message": "user signed-up successfully !"
    })
})

app.listen(3000);