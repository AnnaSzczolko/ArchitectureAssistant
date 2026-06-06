const evaluate = (parcel, req) => {
	const issues = []

	if (req.buildingType !== parcel.buildingType) {
		return {
			status: 'error',
			issues: [`Building type mismatch: request= ${req.buildingType}, parcel= ${parcel.buildingType}`],
		}
	}

	if (req.floors > parcel.maxFloors) {
		issues.push(`Too many floors (${req.floors} > ${parcel.maxFloors})`)
	}

	if (req.apartments > 10 && parcel.area < 1000) {
		issues.push('Too many apartments for parcel size')
	}

	const status = issues.length === 0 ? 'ok' : issues.length === 1 ? 'warning' : 'error'

	return {
		status,
		issues,
	}
}

module.exports = { evaluate }
