export default function parseDate(timestamp) {
	const date = new Date(timestamp)
	const d = date.getDate()
	const y = date.getFullYear()
	const month = date.getMonth()
	const h = date.getHours()
	const m = date.getUTCMinutes()
	const s = date.getSeconds()
	const parsedDate = `erstellt: ${h}:${m}:${s}, ${d}.${month}.${y}`

	return parsedDate
}
