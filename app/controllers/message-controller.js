//var Article = mongoose.model('Article')
//  , Comment = mongoose.model('Comment')


module.exports = function(app){
  app.param('articleId', function(req, res, next, id){
  /*  Article
      .findOne({ _id : id })
      .run(function(err,article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
//       req.article = article;
        next();
      }) */
  });
}
