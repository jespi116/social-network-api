const router = require('express').Router();

const { getAllThoughts, getThoughtById, addThought, updateThought, addReaction, removeReaction, removeThought } = require('../../controllers/thought-controller');

// route for /api/thoughts/:userId
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)


//route for /api/thoughts/:thoughtId  (thoughtId is a parameter)
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

    
//route for /api/thoughts/:thoughtId/reactions 
router
    .route('/:thoughtId/reactions')
    .put(addReaction)


//route for /api/thoughts/:thoughtId/reactions/:reactionId (thoughtId and reactionId are parameters)
router  
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)


module.exports = router;