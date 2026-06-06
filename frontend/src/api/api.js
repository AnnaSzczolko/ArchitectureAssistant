// const BASE = "http://localhost:3000";
const BASE = 'https://architectureassistant.onrender.com'

export const getParcels = async () => {
	const res = await fetch(`${BASE}/parcels`)
	return res.json()
}

export const getRequests = async () => {
	const res = await fetch(`${BASE}/projects`)
	return res.json()
}

export const analyze = async (parcelId, requestId) => {
	const res = await fetch(`${BASE}/analysis`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ parcelId, requestId }),
	})

		const data = await res.json()

	if (!res.ok) {
		throw new Error(data.error || 'Analysis failed')
	}

	return data
}
