const { User, Thoughts } = require("../models");

const userControllers = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'no user with this id' });
                }
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            {runValidators: true, new: true}
        )
        .then((user)=>{
        if(!user){
            res.status(404).json({message: "no user with this id"})
        }
        res.json(user)
    })
    .catch((err)=> res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : Thoughts.findOneAndRemove(
                  { user: req.params.userId },
                  { $pull: { user: req.params.userId } },
                  { new: true }
                )
          )
          .then((course) =>
            !course
              ? res.status(404).json({
                  message: 'user deleted, but no courses found',
                })
              : res.json({ message: 'user successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      addFriend(req, res) {
        console.log('You are adding an friend');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}


module.exports = { ...userControllers }