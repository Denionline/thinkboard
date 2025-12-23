import Note from "../models/Note.js";

export async function getAllNotes(_req, res) {
	try {
		const notes = await Note.find().sort({createdAt: -1});
		res.status(200).json(notes);
	} catch (error) {
		console.error("Error in getAllNotes", error);
		res.status(500).json({message: "Internal server error"});
	}
}

export async function getNoteById(req, res) {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) return res.status(404).json({message: "Note not found!"});
		res.status(200).json(note);
	} catch (error) {
		console.error("Error in getNoteById", error);
		res.status(500).json({message: "Internal server error"});
	}
}

export async function createNote(req, res) {
	try {
		const {title, content} = req.body;
		const note = new Note({title, content});

		const savedNote = await note.save();
		res.status(201).json(savedNote);
		console.log(title, content);
	} catch (error) {
		console.error("Error to create a new note", error);
		res.status(500).json({message: "Internal server error"});
	}
}

export async function updateNote(req, res) {
	try {
		const {title, content} = req.body;
		const noteUpdated = await Note.findByIdAndUpdate(
			req.params.id,
			{
				title,
				content,
			},
			{new: true}
		);
		if (!noteUpdated) return res.status(404).json({message: "Note not found!"});
		res.status(200).json({message: "Note was updated successfully!"});
	} catch (error) {
		console.error("Error to update a note", error);
		res.status(500).json({message: "Internal server error"});
	}
}

export async function deleteNote(req, res) {
	try {
		const deletedNote = await Note.findByIdAndDelete(req.params.id);
		if (!deletedNote) return res.status(404).json({message: "Note not found!"});
		res.status(200).json({message: "Note deleted successfully!"});
	} catch (error) {
		console.error("Error to update a note", error);
		res.status(500).json({message: "Internal server error"});
	}
}
