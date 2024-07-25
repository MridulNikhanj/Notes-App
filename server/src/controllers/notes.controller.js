const Note = require('../models/notes.model');
const User = require('../models/users.model');

async function createNote(req, res) {
    const { text } = req.body;
    try {
        if(req.userEmail) res.status(403).json({success: 403, message: 'you are not authorized'});
        console.log(req.userId);
        const user = await User.findById(req.userId);
        // const user = User.findOne({email: req.userEmail});
        if(!user) res.status(404).json({success: 404, message: 'user not found'});
        const newNote = new Note({
            text,
            userId: user._id,
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json(note);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getAllNotes(req, res) {
    //Get All Notes
}

async function updateNote(req, res) {
    //Update Note
}

async function deleteNote(req, res) {
    //Delete Note
}

module.exports = {
    createNote,
    getNote,
    getAllNotes,
    updateNote,
    deleteNote
};