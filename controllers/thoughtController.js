const { User, Thought } = require('../models')

const thoughtController = {
  getThought(req,res) {
    Thought.find({})
    .then(thought => res.json(thought))
    .catch(err => res.status(500).json(err))
  },
  getOneThought(req, res) {
    Thought.findById({ _id: req.params.thoughtId })
    .select('-__v')
    .then(thought => 
      !thought 
        ? res.status(404).json({ message: "Could not find a though with that ID."})
        : res.json(thought)
        )
    .catch(err => res.status(500).json(err))
  },
  createThought(req, res) {
    Thought.create(req.body)
    .then(({ _id}) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true}
      )
    })
    .then(newThought => 
      !newThought
        ? res.status(404).json({ message: 'Could not find a user with this ID'})
        : res.json(newThought)
        )
    .catch(err => res.status(500).json(err))
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then(user => 
      !user
        ? res.status(404).json({ message: "No user found with that ID"})
        : res.json(user)
        )
    .catch(err => res.status(500).json(err))
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
    .then(thought => 
      !thought
        ? res.status(404).json({ message: "Could not find thought with that ID"})
        : User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId }},
          { new: true}
        ))
    .then(user => 
      !user
        ? res.status(404).json({ message: "Thought was destroyed, but could not find a user with that ID"})
        : res.json({ message: "Thought deleted successfully"})
        )
    .catch(err => res.status(500).json(err))
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true}
    )
    .then(reaction => 
      !reaction
       ? re.status(404).json({ message: "Could not find a thought with that ID"})
       : res.json(reaction))
    .catch(err => res.status(500).json(err))
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId}}},
      { runValidators: true, new: true}
    )
    .then(reaction => 
      !reaction
        ? res.status(404).json({ message: "Could not find a thought with this ID"})
        : res.json(reaction))
    .catch(err => res.status(500).json(err))
  }
}



module.exports = thoughtController