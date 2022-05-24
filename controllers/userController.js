const { User, Thoughts } = require("../models");

const userController = {
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
    getSingUser( req , res){
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message: 'no user with this id'});
            }
            res.json(dbUserData)
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err)
        });
    },
    createUser( req , res) {
        User.create(req.body)
    }

},


    module.exports = userController;