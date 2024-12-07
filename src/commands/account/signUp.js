const User = require('../../models/User');
const signUpEmbeds = require('../../modules/createEmbeds/signUpEmbeds');
const signUpButtons = require('../../modules/createButtons/signUpButtons');

module.exports = {
    name: '가입',
    description: '가입합니다!',
    signUp: false,

    callback: async (client, interaction) => {
        try {
            const existingUser = await User.findOne({ userId: interaction.user.id });

            if (existingUser) {
                const alreadySignedUpEmbed = signUpEmbeds.createAlreadySignedUpEmbed();
                return interaction.reply({
                    embeds: [alreadySignedUpEmbed],
                    ephemeral: true,
                });
            }

            const termsEmbed = signUpEmbeds.createTermsEmbed();
            const signUpButton = signUpButtons.createSignUpButton();

            await interaction.reply({
                embeds: [termsEmbed],
                components: [signUpButton],
                ephemeral: true,
            });

            const filter = (btnInteraction) =>
                btnInteraction.customId === 'signUpButton' && btnInteraction.user.id === interaction.user.id;

            try {
                const buttonInteraction = await interaction.channel.awaitMessageComponent({
                    filter,
                    time: 60000,
                });

                const newUser = new User({
                    userId: interaction.user.id,
                    username: interaction.user.tag,
                    joinedAt: new Date(),
                });

                await newUser.save();

                const successEmbed = signUpEmbeds.createSuccessEmbed(interaction.user.tag);
                await buttonInteraction.update({
                    embeds: [successEmbed],
                    components: [],
                });
            } catch {
                const timeoutEmbed = signUpEmbeds.createTimeoutEmbed();
                await interaction.editReply({
                    embeds: [timeoutEmbed],
                    components: [],
                });
            }
        } catch (error) {
            const errorEmbed = signUpEmbeds.createErrorEmbed();
            return interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    },
};
