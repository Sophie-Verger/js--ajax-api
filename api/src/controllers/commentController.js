const Comment = require('../models/commentModel');

// GET /posts/:id_post/comments
exports.listAllComments = (req, res) => {
    Comment.find({id_post: req.params.id_post}, (error, comments) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        }
        else {
            res.status(200);
            res.json(comments)
        }
    });
}

// POST /posts/:id_post/comments
exports.createAComment = (req, res) => {
    let newComment = new Comment(req.body);
    newComment.id_post = req.params.id_post;

    newComment.save((error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        }
        else {
            res.status(201);
            res.json(comment)
        }
    });
}

// GET /comments/:id_comment
exports.getAComment = (req, res) => {
    Comment.findById(req.params.id_comment, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        }
        else {
            res.status(200);
            res.json(comment)
        }
    });
}

exports.updateAComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id_comment, req.body, {new: true}, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        }
        else {
            res.status(200);
            res.json(comment)
        }
    })
}

exports.deleteAComment = (req, res) => {
    Comment.findByIdAndDelete(req.params.id_comment, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        }
        else {
            res.status(200);
            res.json({
                message: "Commentaire supprimé"
            })
        }
    })
}