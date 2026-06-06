import React from 'react'

export default function ParcelSelect({ parcels, parcelId, onParcelChange, selectedParcel }) {

	return (
		<div>
			<h2 className="section-title">Select Parcel</h2>

			<select className="select" value={parcelId} onChange={e => onParcelChange (Number(e.target.value))}>
				{parcels.map(parcel => (
					<option key={parcel.id} value={parcel.id}>
						{parcel.name}
					</option>
				))}
			</select>

			{selectedParcel && (
				<div className="card">
					<h3>{selectedParcel.name}</h3>

					<p>
						<strong>Area:</strong> {selectedParcel.area} m²
					</p>

					<p>
						<strong>Max Height:</strong> {selectedParcel.maxHeight} m
					</p>

					<p>
						<strong>Max Floors:</strong> {selectedParcel.maxFloors}
					</p>

					<p>
						<strong>Max Coverage:</strong> {selectedParcel.maxCoverage}%
					</p>

					<p>
						<strong>Allowed Building:</strong> {selectedParcel.buildingType}
					</p>
				</div>
			)}
		</div>
	)
}
