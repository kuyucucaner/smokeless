const GroupModel = require("../models/group-model");

const GroupController = {

    addGroup : async function ( req, res ) {
        const userId = req.user.id;
        const { group_name } = req.body;
        console.log("User ID:", userId); // Log the user ID
        console.log("Group Name:", group_name); // Log the group name
        if(!group_name ||!userId) {
            return res.status(400).json({ message: 'Group name and user ID are required!' });
        }
        try {
            const groupId = await GroupModel.addGroup({user_id : userId, group_name : group_name});
            console.log('Group Added!', groupId);
            return res.status(200).json({ groupId: groupId });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    joinGroup : async function (req, res ) {
        const userId = req.user.id;
        const { group_id } = req.body;
        console.log("User ID:", userId); // Log the user ID
        console.log("Group ID:", group_id); // Log the group ID
        if(!group_id ||!userId) {
            return res.status(400).json({ message: 'Group ID and user ID are required!' });
        }
        try {
            const joined = await GroupModel.joinGroup({user_id : userId, group_id : group_id});
            console.log('User Joined Group!', joined);
            return res.status(200).json({ message: 'User Joined Group!' });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
 };

module.exports = GroupController;