
const Note  = require('../models/note.js');

const create =(req, res) =>{
    if(!req.body.content){
        return res.status(400).send({message:'Note content can not be empty'});
    }

    const note = new Note({
        title:req.body.title || 'Untitled note',
        content:req.body.content
    });

    note.save()
        .then(data =>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while creating the Note."});
        });
};


const findAll = (req, res)=>{
    Note.find()
    .then(note =>{
        res.send(note);
    }).catch(err =>{
        res.status(500).send({message:err.message || "Some error occurred while fetching the Note."})
    });   
};

const findOne = (req, res)=>{
    Note.findById(req.params.noteId)
        .then(note =>{
            if(!note){
                return res.status(400).send({message: "Some error occurred while fetching "+req.params.noteId});
            }
            res.send(note);
        }).catch(err =>{
            if(err.kind == 'ObjectId'){
                return res.status(400).send({message: "Some error occurred not found "+req.params.noteId});
            }
            return res.status(500).send({message: "Some error occurred while fetching "+req.params.noteId});
        });
};

const update = (req, res)=>{
     if(!req.body.content){
         return res.status(400).send({message:"note cannot be empty"});
     }
     Note.findByIdAndUpdate(req.params.noteId,{
        title: req.body.title || "Untitled Note",
        content: req.body.content   
     },{new:true})
     .then(note=>{
        if(!note){
            return res.status(400).send({message: "Some error occurred not found "+req.params.noteId});
        }
        return res.send(note);
     }).catech(err=>{
        if(err.kind == 'ObjectId'){
            return res.status(400).send({message: "Some error occurred not found "+req.params.noteId});
        }
        return res.status(500).send({message: "Some error occurred while updating "+req.params.noteId});
     });
};

const deleteNote = (req, res)=>{
    Note.findByIdAndRemove(req.params.noteId)
        .then(note=>{
            if(!note){
                return res.status(400).send({message: "Some error occurred not found "+req.params.noteId});
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err=>{
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};

module.exports = {
    create:create,
    findAll:findAll,
    findOne:findOne,
    update:update,
    deleteNote:deleteNote};