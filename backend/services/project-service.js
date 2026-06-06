const fs = require('fs')
const path = require('path')
const { extractRequirements } = require('./ai-services')
const { evaluate } = require('./rule-engine')
const { loadParcels } = require('../repositories/parcelRepository')
const { loadRequests } = require('../repositories/requestRepository')

const getSummary = status => {
	switch (status) {
		case 'ok':
			return 'Project is fully compatible with parcel regulations.'
		case 'warning':
			return 'Project is mostly compatible but requires adjustments.'
		default:
			return 'Project is NOT compatible due to critical constraints.'
	}
}

const analyzeProject = async (parcelId, requestId) => {
	const parcels = loadParcels()
	const requests = loadRequests()

	const parcel = parcels.find(p => p.id === parcelId)
	const request = requests.find(r => r.id === requestId)

	if (!parcel || !request) {
		throw new Error('Parcel or Request not found')
	}

	const extracted = await extractRequirements(request.description)

	if (!extracted || !extracted?.floors || !extracted?.buildingType) {
		return res.status(500).json({
			error: 'Invalid AI response',
		})
	}

	const validation = evaluate(parcel, extracted)

	return {
		parcel,
		request,
		extractedRequirements: extracted,
		validation,
		summary: getSummary(validation.status),
	}
}

module.exports = {
	analyzeProject,
}
