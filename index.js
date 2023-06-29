// const yargs = require('yargs')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { addNote, printNotes, removeNoteById } = require('./notes.controller')

const pkg = require('./package.json')

yargs(hideBin(process.argv))
	.command(
		'add',
		'Add new note to list',
		(yargs) => {
			yargs.option('title', {
				type: 'string',
				describe: 'Note title',
				demandOption: true
			})
		},
		({ title }) => addNote(title)
	)
	.command('list', 'Print all notes', async () => await printNotes())
	.command(
		'remove',
		'Remove note by id',
		(yargs) => {
			yargs.option('id', {
				type: 'string',
				describe: 'Note id',
				demandOption: true
			})
		},
		async ({ id }) => await removeNoteById(id)
	)
	.version(pkg.version)
	.parse()
