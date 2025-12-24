import express, { type Request, type Response } from "express";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            "message": "all users fetched successfully !",
            users
        })
    } 
    catch (err) {
        return res.status(500).json({ err })
    }
})

app.post("/sign-up", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) 
        return res.status(400).json({
            "message": "username or password is not provided"
        })

    try{
        await prisma.user.create({
            data: {
                username,
                password
            }
        });

        return res.status(201).json({
            "message": "user signed-up successfully !"
        })
    }
    catch(err: any){
        return res.status(500).json({ err })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`app is listening on the port: ${process.env.PORT}`);
});
