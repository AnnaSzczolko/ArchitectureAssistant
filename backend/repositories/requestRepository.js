const fs = require('fs')
const path = require('path')

const loadRequests = () => {
	return JSON.parse(
		fs.readFileSync(
			path.join(__dirname, '../data/projectRequest.json'),
			'utf-8'
		)
	)
}

module.exports = {
	loadRequests,
}