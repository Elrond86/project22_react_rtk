export default function parseDate(timestamp) {
	const date = new Date(timestamp)
	const d = date.getDate()
	const y = date.getFullYear()
	const month = date.getMonth()
	const h = date.getHours()
	const m = date.getUTCMinutes()
	const s = date.getSeconds()

	function addZero(x) {
		if (x < 10) return `0${x}`
		return x
	}

	const parsedDate = `${addZero(h)}:${addZero(m)}:${addZero(s)}, ${addZero(d)}.${addZero(month)}.${y}`

	return parsedDate
}
