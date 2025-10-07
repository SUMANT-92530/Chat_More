const Demo = require("../models/Demo")


const demoHere = async (req,res) => {
    try{
        const {name} = req.body;

        //create a new object and insert in db
        const response = await Demo.create({name});

        //send a json response with a success flag
        res.status(200).send("Hii---i am here in demo controllers");
    }

    catch(error){
        res.status(500).json({ message: "Server Error in demo controllers" });
    }
}


module.exports = { demoHere};