const { User, Thoughts, Reaction } = require("../models");

const thoughtsController = {
    getThoughts(req, res) {
        Thoughts.find()
            .select('-__v')
            .then((dbThoughtsData) => {
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .select('-__v')
            .populate('reactions')
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: 'no thought with this id' });
                }
                res.json(dbThoughtsData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateThoughts(req, res){
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId},
            { $set: req.body },
            {runValidators: true, new: true}
        )
        .then((thought)=>{
        if(!thought){
            res.status(404).json({message: "no thought with this id"})
        }
        res.json(thought)
    })
    .catch((err)=> res.status(500).json(err))
    },
    deleteThoughts(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              : Reaction.findOneAndRemove(
                  { user: req.params.thoughtsId },
                  { $pull: { user: req.params.thoughtsId } },
                  { new: true }
                )
          )
          .then((course) =>
            !course
              ? res.status(404).json({
                  message: 'Thought deleted, but no reactions found',
                })
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtsId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No Thoughts found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { reactions: { reactions: req.params.thoughtsId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No THought found with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}


module.exports = { ...thoughtsController }