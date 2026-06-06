import React from 'react'

export default function ResultPanel({ result, statusInfo }) {
	return (
		<div className="result-card">
			<div className={`validation-card ${statusInfo.className}`}>
				<div className="validation-header">
					<h2>{statusInfo.label}</h2>

					<div className={`status-badge ${statusInfo.className}`}>{result.validation.status.toUpperCase()}</div>
				</div>

				<p className="validation-summary">{result.summary}</p>

				<div className="validation-divider" />

				<h4>Detected Issues</h4>

				{result.validation.issues.length === 0 ? (
					<div className="success-message">✅ No issues detected</div>
				) : (
					<ul className="issue-list">
						{result.validation.issues.map((issue, index) => (
							<li key={index} className="issue-item">
								⚠️ {issue}
							</li>
						))}
					</ul>
				)}
			</div>

			<h2>Analysis Result</h2>

			<div className="analysis-layout">
				<div className="card">
					<h3>Investor Input</h3>
					<p>{result.request.description}</p>
				</div>

				<div className="card">
					<h3>AI Extracted Requirements</h3>

					<p>
						<strong>Floors:</strong> {result.extractedRequirements.floors}
					</p>

					<p>
						<strong>Building Type:</strong> {result.extractedRequirements.buildingType}
					</p>

					<p>
						<strong>Apartments:</strong> {result.extractedRequirements.apartments}
					</p>

					<p>
						<strong>Area:</strong> {result.extractedRequirements.area} m²
					</p>
				</div>
			</div>

		</div>
	)
}
