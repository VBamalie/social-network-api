//import the needed modules
const router = require("express").Router();
const{
    getThoughts,
    getSingleThought,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction
} = require("../../controllers/thoughtController")
//api/thoughts route
router.route("/").get(getThoughts).post(createThoughts);
//api.thoughts: id
router.route("/:thoughtsId").get(getSingleThought).put(updateThoughts).delete(deleteThoughts);

//api.thoughts/:id/ reactions route
router.route("/:thoughtsId/reactions").post(addReaction)

//api/thoughts/:thoughts id/ reactions/ id
router.route("/:thoughtsId/reactions/:reactionId").delete(removeReaction)

//export
module.exports = router;