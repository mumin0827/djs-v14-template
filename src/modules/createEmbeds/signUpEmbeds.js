const { EmbedBuilder } = require('discord.js');

module.exports = {
    createTermsEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '이용 약관' })
            .setDescription(
                '이용하시려면 아래 "가입" 버튼을 눌러주세요.\n\n**이용 약관**\n1. 어쩌구.\n2. 저쩌구.\n\n계속 진행하시면 위 약관에 동의한 것으로 간주됩니다.'
            )
            .setColor(0x2b2d31);
    },

    createSuccessEmbed: (username) => {
        return new EmbedBuilder()
            .setAuthor({ name: '가입 완료' })
            .setDescription(`${username} 님, 성공적으로 가입되었습니다!`)
            .setColor(0x2b2d31);
    },

    createAlreadySignedUpEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '이미 가입된 유저' })
            .setDescription('이미 가입되어 있습니다. 추가 가입은 필요하지 않습니다.')
            .setColor(0x2b2d31);
    },

    createTimeoutEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '시간 초과' })
            .setDescription('시간이 초과되었습니다. 다시 시도해주세요.')
            .setColor(0x2b2d31);
    },

    createErrorEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '오류 발생' })
            .setDescription('가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
            .setColor(0x2b2d31);
    },
};
