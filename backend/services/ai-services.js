const OpenAI = require('openai')

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const REQUIREMENTS_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    properties: {
        floors: { type: 'number' },
        buildingType: {
            type: 'string',
            enum: ['single-family house', 'multi-family', 'semi-detached house', 'service building'],
        },
        apartments: { type: 'number' },
        area: { type: 'number' },
    },
    required: ['floors', 'buildingType', 'apartments', 'area'],
}

const extractRequirements = async description => {
	try {
		const response = await client.responses.create({
			model: 'gpt-5',
			input: `
You are an architectural assistant.

Extract data from investor description.

Rules:
- floors = number of above-ground floors
- buildingType must be one of:
  - single-family house
  - multi-family
  - semi-detached house
  - service building
- apartments defaults to 1
- area is total usable floor area in m²
- return values even if estimated

Description:
${description}
`,
			text: {
				format: {
					type: 'json_schema',
					name: 'construction_extraction',
					schema: REQUIREMENTS_SCHEMA,
				},
			},
		})

		if (!response.output_text) {
			throw new Error('No output_text returned from OpenAI')
		}

		const data = JSON.parse(response.output_text)

		return {
			floors: Math.max(1, Number(data.floors ?? 1)),
			buildingType: data.buildingType ?? 'single-family house',
			apartments: Math.max(1, Number(data.apartments ?? 1)),
			area: Math.max(0, Number(data.area ?? 0)),
		}
	} catch (error) {
		throw new Error(`Failed to extract requirements: ${error.message}`)
	}
}

module.exports = { extractRequirements }
