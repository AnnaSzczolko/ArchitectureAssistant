const fs = require('fs')
const path = require('path')

const loadParcels = () => {
	return JSON.parse(
		fs.readFileSync(
			path.join(__dirname, '../data/parcels.json'),
			'utf-8'
		)
	)
}

module.exports = {
	loadParcels,
}