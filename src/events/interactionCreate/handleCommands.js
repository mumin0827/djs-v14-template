const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const User = require('../../models/User');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        const signUpRequired = commandObject.signUp ?? true;
        if (signUpRequired) {
            const user = await User.findOne({ userId: interaction.user.id });
            if (!user) {
                return interaction.reply({
                    content: '이 명령어를 사용하려면 먼저 `/가입`을 완료해야 합니다.',
                    ephemeral: true,
                });
            }
        }

        if (commandObject.testOnly && interaction.guild.id !== testServer) {
            interaction.reply({
                content: '이 명령어는 테스트 서버에서만 사용할 수 있습니다.',
                ephemeral: true,
            });
            return;
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: '권한이 부족합니다.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: '봇 권한이 부족합니다.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.error(`명령어 실행 중 오류 발생: ${error}`);
    }
};