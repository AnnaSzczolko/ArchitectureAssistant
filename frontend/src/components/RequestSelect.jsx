import React from 'react'

export default function RequestSelect({ requests, requestId, onRequestChange, selectedRequest }) {

	return (
		<div>
			<h2 className="section-title">Investor Requirements</h2>

			<select className="select" value={requestId} onChange={e => onRequestChange(Number(e.target.value))}>
				{requests.map(request => (
					<option key={request.id} value={request.id}>
						Request #{request.id}
					</option>
				))}
			</select>

			{selectedRequest && (
				<div className="card">
					<h3>Project Description</h3>

					<p>{selectedRequest.description}</p>
				</div>
			)}
		</div>
	)
}
