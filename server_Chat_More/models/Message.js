import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    // By default, Mongoose adds a unique `_id` of type ObjectId.
    // It's often simpler to let Mongoose handle this unless you have a
    // specific reason to create your own string IDs.
    
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Creates a reference to your User model
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Creates a reference to your User model
        required: true,
    },
    text:{
        type: String,
    },
    image:{
        type: String,
    },
    seen:{
        type: Boolean,
        default: false,
    },
}, {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

export default Message; // 👈 This is a DEFAULT export