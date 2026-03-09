
//controller function to make revision of a project

import { Request, Response } from "express";
import  prisma  from "../lib/prisma.js";


export const makeRevision = async (req: Request, res: Response) => {
    const userId = req.userId
    try {
        const { projectId } = req.params
        const {message} = req.body
         const user = await prisma.user.findUnique({
            where: { id: userId },
        })
        if (!userId || !user) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        if(user.credits < 5){
            return res.status(403).json({ message: "Not enough credits" })
        }

        if(!message || message.trim() === ''){
            return res.status(400).json({ message: "Message cannot be empty" })
        }

        const currentProject = await prisma.websiteProject.findFirst({
            where: { id: String(projectId), userId },
            include: {versions: true}
        })

        if(!currentProject){
            return res.status(404).json({ message: "Project not found" })
        }

        await prisma.conversation.create({
            data:{
                role: 'user',
                content: message,
                projectId: currentProject.id
            }
        })

        await prisma.user.update({
            where:{id:userId},
            data:{
                credits: { decrement: 5 },
            }
        })
       
        res.json({ credits: user?.credits })
    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(500).json({ message:error.message })
    }
}