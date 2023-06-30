document.addEventListener('click', async (e) => {
	const { target } = e
	if (target.dataset.type === 'remove') {
		const id = target.dataset.id
		await remove(id).then(() => {
			target.closest('li').remove()
		})
	} else if (target.dataset.type === 'edit') {
		const id = target.dataset.id
		const title = target.closest('li').children[0].textContent
		const newTitle = prompt('Введите новое значение', title) || title
		await edit(id, newTitle).then(() => (target.closest('li').children[0].textContent = newTitle))
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
	await fetch(`/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, id })
	})
}
