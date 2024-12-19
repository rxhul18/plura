import { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel, DMChannel } from "discord.js";
import * as fromTS from 'typescript';

export default {
    name: "eval",
    aliases: ["dev", "exe", "jsk"],
    category: "dev",
    adminPermit: false,
    ownerPermit: false,
    run: async (
        client: Client & { config: { owner: string[] } },
        message: Message,
        args: string[],
    ) => {
        const authorizedUsers = [
            ...client.config.owner,
        ];

        if (!authorizedUsers.includes(message.author.id)) {
            return;
        }

        const code = args.join(" ");
        if (!code) {
            const embed = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription("Please provide an argument to evaluate.");
            if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
                return message.channel.send({ embeds: [embed] });
            }
            return;
        }

        let evaled: any;
        try {
            if (code.includes("client.token") || code.match(/Token|bot_token|mongo/i)) {
                evaled = "Haha, You Idiot nice try but I caught you!";
            } else {
                // Check if the code looks like TypeScript (ends with .ts or contains TypeScript-specific features)
                if (code.includes('import') || code.includes('export')) {
                    // Transpile the TypeScript code to JavaScript
                    const tsCode = fromTS.transpileModule(code, {
                        compilerOptions: { module: fromTS.ModuleKind.CommonJS },
                    });
                    // Execute the transpiled JavaScript code
                    evaled = await eval(tsCode.outputText);
                } else {
                    // Execute JavaScript code
                    evaled = await eval(code);
                }
            }

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled, { depth: 0 });
            }

            const output = clean(evaled);
            const embed = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription(
                    `**Input**: \`\`\`js\n${code}\`\`\`\n**Output**: \`\`\`js\n${output}\`\`\``
                );

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("cmd_delete")
                        .setLabel("DELETE")
                );

            if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
                message.channel.send({ embeds: [embed], components: [row] });
            }
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription(
                    `**Input**: \`\`\`js\n${code}\`\`\`\n**Output**: \`\`\`js\n${error}\`\`\``
                );

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("cmd_delete")
                        .setLabel("DELETE")
                );

            if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
                message.channel.send({ embeds: [errorEmbed], components: [row] });
            }
        }
    },
};

// Function to sanitize the output string and prevent breaking the formatting
function clean(string: string): string {
    return string
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
}
