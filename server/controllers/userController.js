



const getMyProfile = async (req,res) => {
    try{

    }

    catch(error){
        res.status(500).json({
            message:"Server error during getMyProfile controllers.."
        })
    }
}

const searchUsers = async (req,res) => {
    try{

    }

    catch(error){
        res.status(500).json({
            message:"Server error during serchUsers controllers.."
        })
    }
}

const addContact = async (req, res) => {
    try {
        const { contactId } = req.body;
        const userId = req.user.userId;

        //

    } catch (error) {
        res.status(500).json({ message: "Server Error during addContact controllers.." });
    }
};

const getContacts = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('contacts', 'userName profilePictureUrl about lastSeen');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.contacts);

    } catch (error) {
        res.status(500).json({ message: "Server Error during getContacts controllers.." });
    }
};

module.exports = { getMyProfile, searchUsers, addContact, getContacts };