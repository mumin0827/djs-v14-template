const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        joinedAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false,
    }
);

module.exports = model('User', userSchema);
