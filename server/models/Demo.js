const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        }
    },
    {
        // This option automatically adds `createdAt` and `updatedAt` fields,
        // which is exactly what you need.
        timestamps: true,
    }
);

module.exports = mongoose.model("demo", demoSchema);
