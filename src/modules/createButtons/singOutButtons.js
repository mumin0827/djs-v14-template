const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    createConfirmationButtons: () => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('confirmWithdraw')
                .setLabel('확인')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('cancelWithdraw')
                .setLabel('취소')
                .setStyle(ButtonStyle.Secondary)
        );
    },
};
