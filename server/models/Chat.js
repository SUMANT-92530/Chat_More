const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Creates a reference to the User model
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message", // Creates a reference to the Message model
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Only relevant if isGroupChat is true
        },
    },
    {
        // This option automatically adds `createdAt` and `updatedAt` fields,
        // which is exactly what you need.
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);
