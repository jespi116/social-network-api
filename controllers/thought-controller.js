const { Thought, User } =require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThought => res.json(dbThought))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThought => {
                if (!dbThought) {
                  res.status(404).json({ message: 'No Thought found with this id!' });
                  return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addThought({  body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body}, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId}, body, { new: true, runValidators: true })
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.status(400).json(err));
    },
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;