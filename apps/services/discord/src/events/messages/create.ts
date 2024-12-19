import { Client, Message } from "discord.js";

export default async function handleMessageCreate(client: Client): Promise<void> {
    client.on("messageCreate", async (message: Message) => {
        if (message.author.bot) return;
    
        const prefix = client.config?.prefix || "!";
    
        // Check if the message starts with the prefix
        if (!message.content.startsWith(prefix)) return;
    
        // Get the command name
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();
    
        // If a command is found, execute it
        if (!commandName) return;
    
        const command = client.commands.get(commandName);
    
        if (command) {
            try {
                await command.run(client, message, args, prefix);
            } catch (error) {
                console.error(`Error executing command ${commandName}:`, error);
            }
        } else {
            console.log(`Command ${commandName} not found.`);
        }
    });
}
