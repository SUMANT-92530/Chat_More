const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    userName: {
        type:String,
        require:true,
        trim:true,
        unique:true,
    },
    email: {
        type:String,
        require:true,
        trim:true,
    },
    password: {
        type:String,
        require:true,
    },
    profilePictureUrl: {
        type:String,
        default:"",
    },
    about: {
        type:String,
        default:"Hey there, i am using chatMore."
    },
    contacts: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    
    lastSeen: {
        timestamp: {
            type: Date,
            default: Date.now,
        },
        privacy: {
            type: String,
            // enum ensures that the value must be one of these three strings
            enum: ['everyone', 'my_contacts', 'nobody'],
            default: 'my_contacts',
        }
    },

    createdAt: {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);