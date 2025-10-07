const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    // By default, Mongoose adds a unique `_id` of type ObjectId.
    // It's often simpler to let Mongoose handle this unless you have a
    // specific reason to create your own string IDs.
    
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat', // Creates a reference to your Chat model
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Creates a reference to your User model
        required: true,
    },
    content: {
        type: String,
        trim: true,
        // Content is not required because a message could just be an image or file
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'file'],
        default: 'text',
    },
    mediaUrl: {
        type: String,
        // Only present if the type is not 'text'
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    }
}, {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
});

module.exports = mongoose.model("Message", messageSchema);