const FriendshipModel = require('../models/friendship-model');

const FriendshipController = {

    addFriendship : async function (req, res)  {
        const userId = req.user.id;
        const { friend_id } = req.body;
        console.log("User ID:", userId); // Log the user ID
        console.log("Friend ID:", friend_id); // Log the friend ID
        if(!friend_id ||!userId) {
            return res.status(400).json({ message: 'Friend ID and user ID are required!' });
        }
        try {
            const friendshipId = await FriendshipModel.addFriendship({user_id: userId, friend_id: friend_id});
            console.log('Friendship Added!', friendshipId);
            return res.status(200).json({ friendshipId: friendshipId });
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    getUserFriendships : async function (req , res ) {

        const userId = req.user.id;
        console.log("User ID:", userId); // Log the user ID
        try {
            const friendships = await FriendshipModel.getUserFriendships({ user_id: userId });
            console.log('Friendships:', friendships);
            return res.status(200).json({ friendships });
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
};  

module.exports = FriendshipController;