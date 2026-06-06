import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ResultPanel from '../components/ResultPanel'
import ParcelSelect from '../components/ParcelSelect'
import RequestSelect from '../components/RequestSelect'
import { getParcels, getRequests, analyze } from '../api/api'

export default function Analysis() {
	const [requests, setRequests] = useState([])
	const [parcels, setParcels] = useState([])

	const [parcelId, setParcelId] = useState('')
	const [requestId, setRequestId] = useState('')

	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		try {
			const [parcelsData, requestsData] = await Promise.all([getParcels(), getRequests()])

			setParcels(parcelsData)
			setRequests(requestsData)

			if (parcelsData.length > 0) {
				setParcelId(parcelsData[0].id)
			}

			if (requestsData.length > 0) {
				setRequestId(requestsData[0].id)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleAnalyze = async () => {
		try {
			setLoading(true)

			const data = await analyze(parcelId, requestId)

			setResult(data)
		} catch (error) {
			console.error(error)
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	const selectedParcel = parcels.find(parcel => parcel.id === Number(parcelId))
	const selectedRequest = requests.find(request => request.id === Number(requestId))

	const getStatusInfo = status => {
		switch (status) {
			case 'ok':
				return {
					label: 'Feasible',
					className: 'status-feasible',
				}

			case 'warning':
				return {
					label: 'Partially Feasible',
					className: 'status-warning',
				}

			default:
				return {
					label: 'Not Feasible',
					className: 'status-error',
				}
		}
	}

	const statusInfo = result ? getStatusInfo(result.validation.status) : null

	return (
		<div className="page-container">
			<div className="hero">
				<h1>🏗 AI Construction Analyzer</h1>

				<p>Analyze whether investor requirements fit parcel constraints and planning regulations.</p>
			</div>

			<div className="analysis-layout">
				<ParcelSelect
					parcels={parcels}
					parcelId={parcelId}
					onParcelChange={setParcelId}
					selectedParcel={selectedParcel}
				/>

				<RequestSelect
					requests={requests}
					requestId={requestId}
					onRequestChange={setRequestId}
					selectedRequest={selectedRequest}
				/>
			</div>

			<button className="primary-btn" onClick={handleAnalyze} disabled={loading || !parcelId || !requestId}>
				{loading ? 'Analyzing...' : 'Run AI Analysis'}
			</button>

			{result && statusInfo && !loading && <ResultPanel result={result} statusInfo={statusInfo} />}

			<Link to="/" className="back-link">
				← Back to Dashboard
			</Link>
		</div>
	)
}
