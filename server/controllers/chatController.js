


const accessOrCreateChat = async (req,res) => {
    try{

    }

    catch(error) {
        res.status(500).json({
            message:"Server error during accessOrCreateChat controllers.."
        })
    }
}

const getMyChats = async (req,res) => {
    try{

    }
    
    catch(error){
        res.status(500).json({
            message:"Server error during getMyChats controllers.."
        })
    }
}

const createGroupChat = async (req,res) => {
    try{

    }

    catch(error){
        res.status(500).json({
            message:"Server error during createGrouphat controllers.."
        })
    }
}

module.exports = { accessOrCreateChat, getMyChats, createGroupChat };