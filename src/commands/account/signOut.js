const User = require('../../models/User');
const withdrawEmbeds = require('../../modules/createEmbeds/signOutEmbeds');
const withdrawButtons = require('../../modules/createButtons/singOutButtons');

module.exports = {
    name: '탈퇴',
    description: '탈퇴합니다.',
    callback: async (client, interaction) => {
        try {
            const existingUser = await User.findOne({ userId: interaction.user.id });

            if (!existingUser) {
                const notRegisteredEmbed = withdrawEmbeds.createNotRegisteredEmbed();
                return interaction.reply({
                    embeds: [notRegisteredEmbed],
                    ephemeral: true,
                });
            }

            const confirmationEmbed = withdrawEmbeds.createConfirmationEmbed();
            const confirmationButtons = withdrawButtons.createConfirmationButtons();

            await interaction.reply({
                embeds: [confirmationEmbed],
                components: [confirmationButtons],
                ephemeral: true,
            });

            const filter = (btnInteraction) =>
                ['confirmWithdraw', 'cancelWithdraw'].includes(btnInteraction.customId) &&
                btnInteraction.user.id === interaction.user.id;

            try {
                const buttonInteraction = await interaction.channel.awaitMessageComponent({
                    filter,
                    time: 60000,
                });

                if (buttonInteraction.customId === 'confirmWithdraw') {
                    await User.deleteOne({ userId: interaction.user.id });

                    const successEmbed = withdrawEmbeds.createSuccessEmbed();
                    await buttonInteraction.update({
                        embeds: [successEmbed],
                        components: [],
                    });
                } else if (buttonInteraction.customId === 'cancelWithdraw') {
                    const cancelledEmbed = withdrawEmbeds.createCancelledEmbed();
                    await buttonInteraction.update({
                        embeds: [cancelledEmbed],
                        components: [],
                    });
                }
            } catch {
                const timeoutEmbed = withdrawEmbeds.createTimeoutEmbed();
                await interaction.editReply({
                    embeds: [timeoutEmbed],
                    components: [],
                });
            }
        } catch (error) {
            console.error('탈퇴 처리 중 오류:', error);
            const errorEmbed = withdrawEmbeds.createErrorEmbed();
            return interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    },
};
