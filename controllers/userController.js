const { Thought, User } = require('../models')

const userController = {
    getUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(users => res.json(users))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)})
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(user => 
            !user
                ? res.status(404).json({ message: 'No User found with that ID.'})
                : res.json(user)
            )
            .catch(err => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then(newUser => res.json(newUser))
        .catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then(updatedUser => 
            !updatedUser
                ? res.status(404).json({ message: "Cannot find a user with that ID"})
                : res.json(updatedUser)
                )
        .catch(err => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then(user => 
            !user
                ? res.status(404).json({ message: "No user found with this ID"})
                : Thought.deleteMany({ _id: { $in: user.thoughts}})
                )
        .then(() => res.json({ message: "user and their thoughts deleted"}))
        .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then(friend => 
            !friend
                ? res.status(404).json({ message: "Could not locate user with that ID"})
                : res.json(friend)
                )
        .catch(err => res.status(500).json(err))
    },
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then(friend => 
            !friend
                ? res.status(404).json({ message: "Could not find a user with that ID"})
                : res.json(friend)
                )
        .catch(err => res.status(500).json(err))
    }
}


module.exports = userController