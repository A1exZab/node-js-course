const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { nanoid } = require('nanoid')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: nanoid(10)
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.green.inverse('Note was added!'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgBlue('Here is the list of notes:'))
	notes.forEach((note) => {
		console.log(chalk.green(note.id), chalk.blue(note.title))
	})
}

async function removeNoteById(id) {
	const notes = await getNotes()

	const updatedNotes = notes.filter((note) => note.id !== id)

	await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
	console.log(chalk.red.inverse('Note was removed!'))
}

module.exports = {
	addNote,
	printNotes,
	removeNoteById
}
