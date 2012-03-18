var Colour = mongoose.model('Colour')
  , Message = mongoose.model('Message')

module.exports = function(app){

  // New Colour
  app.get('/colour/new', auth.requiresLogin, function(req, res){
    res.render('colour/new', {
      title: 'New Colour',
      Colour: new Colour({})
    })
  })

  app.param('id', function(req, res, next, id){  
    Colour
      .findOne({ _id : req.params.id })
      .populate('user')
      .run(function(err,Colour) {
        if (err) return next(err)
        if (!Colour) return next(new Error('Failed to load Colour ' + id))
        req.Colour = Colour
        Message
          .find({Colour : req.Colour})
          .run(function (err, Messages) {
            if (err) throw err
            req.Messages = Messages
            next()
          })
      })
  })

  // Create an Colour
  app.post('/Colours', function(req, res){
    var Colour = new Colour(req.body.Colour)
    Colour.user = req.session.auth.userId

    Colour.save(function(err){
      if (err) {
        utils.mongooseErrorHandler(err, req)
        res.render('Colours/new', {
            title: 'New Colour'
          , Colour: Colour
        })
      }
      else {
        req.flash('notice', 'Created successfully')
        res.redirect('/Colour/'+Colour._id)
      }
    })
  })

  // Edit an Colour
  app.get('/Colour/:id/edit', auth.requiresLogin, function(req, res){
    res.render('Colours/edit', {
      title: 'Edit '+req.Colour.title,
      Colour: req.Colour
    })
  })

  // Update Colour
  app.put('/Colours/:id', function(req, res){
    var Colour = req.Colour

    Colour.title = req.body.Colour.title
    Colour.body = req.body.Colour.body

    Colour.save(function(err, doc) {
      if (err) {
        utils.mongooseErrorHandler(err, req)
        res.render('Colours/edit', {
            title: 'Edit Colour'
          , Colour: Colour
        })
      }
      else {
        req.flash('notice', 'Updated successfully')
        res.redirect('/Colour/'+Colour._id)
      }
    })
  })

  // View an Colour
  app.get('/Colour/:id', function(req, res){
    res.render('Colours/show', {
      title: req.Colour.title,
      Colour: req.Colour,
      Messages: req.Messages
    })
  })

  // Delete an Colour
  app.del('/Colour/:id', function(req, res){
    var Colour = req.Colour
    Colour.remove(function(err){
      req.flash('notice', 'Deleted successfully')
      res.redirect('/Colours')
    })
  })

  // Listing of Colours
  app.get('/Colours', function(req, res){
    Colour
      .find({})
      .desc('created_at') // sort by date
      .run(function(err, Colours) {
        if (err) throw err
        res.render('Colours/index', {
          title: 'List of Colours',
          Colours: Colours
        })
      })
  })

  // home
  app.get('/', function(req, res){
    res.redirect('/Colours')
  })
}
