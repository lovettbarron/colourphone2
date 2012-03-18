// Article schema

var ColourSchema = new Schema({
    title       : {type : String, default : '', trim : true}
  , body        : {type : String, default : '', trim : true}
  , user        : {type : Schema.ObjectId, ref : 'User'}
  , created_at  : {type : Date, default : Date.now}
})

ColourSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Article title cannot be blank')

ColourSchema.path('body').validate(function (body) {
  return body.length > 0
}, 'Article body cannot be blank')


mongoose.model('Colour', ColourSchema)
