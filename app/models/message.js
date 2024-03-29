// comment schema

var MessageSchema = new Schema({
    body        : {type : String, default : ''}
  , article     : {type : Schema.ObjectId, ref : 'Article'}
  , user        : {type : Schema.ObjectId, ref : 'User'}
  , created_at  : {type : Date, default : Date.now}
})

mongoose.model('Message', MessageSchema)
