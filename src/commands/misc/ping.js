const {EmbedBuilder} = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: '핑',
    description: '퐁!',
    // options: Object[],
    // signUp: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    callback: async (client, interaction) => {
        const pingEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setAuthor({ name: `퐁! (${client.ws.ping}ms)` })

        await interaction.deferReply();
        await wait(2_000);
        await interaction.editReply({ embeds: [pingEmbed] });
    },
};