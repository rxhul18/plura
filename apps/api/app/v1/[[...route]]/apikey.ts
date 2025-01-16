import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";


const app = new Hono()
    .get("/", async(c)=>{
        c.json({
            message:"I m alocad fasdf"
        })
    })