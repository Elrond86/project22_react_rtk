export function jsn(data) {
	return JSON.stringify(data, null, 4)
}

export function jlog(data) {
	return console.log(JSON.stringify(data, null, 4))
}

export default function JsonHelper(data) {
	return <pre>{JSON.stringify(data, null, 4)}</pre>
}
