const { EmbedBuilder } = require('discord.js');

module.exports = {
    createConfirmationEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '탈퇴 확인' })
            .setDescription(
                '정말로 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.\n\n확인하시려면 아래 버튼을 클릭해주세요.'
            )
            .setColor(0x2b2d31);
    },

    createSuccessEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '탈퇴 완료' })
            .setDescription('성공적으로 마양봇에서 탈퇴되었습니다. 데이터가 삭제되었습니다.')
            .setColor(0x2b2d31);
    },

    createCancelledEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '탈퇴 취소' })
            .setDescription('탈퇴 요청이 취소되었습니다. 계속 마양봇을 이용해주세요!')
            .setColor(0x2b2d31);
    },

    createTimeoutEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '시간 초과' })
            .setDescription('시간이 초과되어 탈퇴 요청이 취소되었습니다.')
            .setColor(0x2b2d31);
    },

    createErrorEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '오류 발생' })
            .setDescription('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
            .setColor(0x2b2d31);
    },

    createNotRegisteredEmbed: () => {
        return new EmbedBuilder()
            .setAuthor({ name: '가입 기록 없음' })
            .setDescription('가입 기록이 없습니다. 탈퇴할 필요가 없습니다.')
            .setColor(0x2b2d31);
    },
};
