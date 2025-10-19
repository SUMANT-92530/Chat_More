import mongoose from "mongoose";
import 'dotenv/config';

export const database = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Succesfully"))
    .catch( (error) => {
        console.log("DB Connection Fail");
        console.error(error);
        process.exit(1);
    })
};