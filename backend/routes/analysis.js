const express = require('express')
const { analyzeProject } = require('../services/project-service')

const router = express.Router()

router.post('/', async (req, res) => {
	try {
		const { parcelId, requestId } = req.body

		if (!parcelId || !requestId) {
			return res.status(400).json({
				error: 'parcelId and requestId are required',
			})
		}

		const result = await analyzeProject(parcelId, requestId)

		res.json(result)
	} catch (error) {
		res.status(500).json({
			error: error.message || 'Internal server error',
		})
	}
})

module.exports = router
