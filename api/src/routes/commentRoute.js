const commentController = require('../controllers/commentController');

module.exports = (server) => {
    server.route('/posts/:id_post/comments') // req.params.id_post
        .get(commentController.listAllComments)
        .post(commentController.createAComment);

    server.route('/comments/:id_comment') // req.params.id_comments
        .get(commentController.getAComment)
        .put(commentController.updateAComment)
        .delete(commentController.deleteAComment);
}
