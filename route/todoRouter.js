var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var todos = require('../model/todo');

var todoRouter = express.Router();
todoRouter.use(bodyParser.json());

todoRouter.route('/')
.get(function(req,res,next){
    
    todos.find({},function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    
})
.post(function(req,res,next){
    
     todos.create({
            text : req.body.text,
            done : false
        }, function(err, todos) {
            if (err)
                res.send(err);
});
            // get and return all the todos after you create another
            todos.find({},function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        
    


});



todoRouter.route('/:todo_id')
.delete(function(req,res,next){
    
     todos.findByIdAndRemove(req.params.todo_id, function (err, resp) {        
         if (err) throw err;
    });
    
     todos.find({},function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
    

    });

module.exports=todoRouter;
