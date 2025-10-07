



const sendMessage = async (req,res) => {
    try{

    }

    catch(error) {
        res.status(500).json({ message: "Server Error sending message" });
    }
}

const getAllMessage = async (req,res) => {
    try{

    }

    catch(error) {
        res.status(500).json({
            message:"Server error while getting all messages.."
        })
    }
}

module.exports = {sendMessage,getAllMessage};