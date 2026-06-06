import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
	const navigate = useNavigate()

	return (
		<div className="page-container">
			<div className="hero">
				<h1>🏗 AI Construction Analyzer</h1>

				<p>
					AI-powered assistant for architects and developers. The application transforms investor requirements into
					structured project parameters and evaluates whether a proposed development can be built on a selected parcel.
				</p>

				<button className="primary-btn" onClick={() => navigate('/analysis')}>
					Start Analysis
				</button>
			</div>
		</div>
	)
}
