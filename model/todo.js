var mongoose = require('mongoose');

var todos=mongoose.model('todo',{
    text:String
});


module.exports=todos;