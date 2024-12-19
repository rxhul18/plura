import { Client } from "discord.js";

export default async function alive(client: Client) {
    client.on("ready", async () => {
        console.log(`${client.user?.username} is ready! 🤖`)
        client.user?.setPresence({
            activities: [{
                name: `${client.config?.prefix}help`,
                type: 3,
            }],
            status: "dnd"
        });
    });
}