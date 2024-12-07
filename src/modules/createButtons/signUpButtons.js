const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    createSignUpButton: () => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('signUpButton')
                .setLabel('가입')
                .setStyle(ButtonStyle.Success)
        );
    },
};
