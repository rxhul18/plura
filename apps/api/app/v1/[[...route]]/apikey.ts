import { Hono } from "hono";
import { Unkey } from "@unkey/api";

const app = new Hono()
    .post("/", async (c) => {
        const unkey = new Unkey({rootKey:"unkey_3ZbGKEf6sN8Fhb5p3r7rSRVN"})
        const key = await unkey.keys.create({
                apiId:"api_2bPaGiPMLmSeUGZVCnWTPk4FKEfi", 
            })
        
        return c.json(
            JSON.stringify(key)
            ,200);
    })
    .get("/all", async(c)=>{
        
    })


export default app;