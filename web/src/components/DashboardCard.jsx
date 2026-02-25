import React from 'react'
import { useNavigate } from 'react-router-dom'
import MaleIcon from '../../assets/male.png'
import FemaleIcon from '../../assets/profile.png'

const DashboardCard = ({ name, profilePic, patientId, gender, status }) => {
    const navigate = useNavigate()

    const getImageSource = () => {
        if (profilePic) return profilePic
        if (gender === 'Male') return MaleIcon
        return FemaleIcon
    }

    return (
        <div
            onClick={() => navigate(`/patient/${patientId}`)}
            className="group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
            <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                    <img
                        src={getImageSource()}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = FemaleIcon
                        }}
                    />
                </div>

                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                >
                    {status ? 'Active' : 'Inactive'}
                </span>
            </div>

            <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                    {name || 'No name'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{gender || 'Unknown'}</p>
            </div>

            <div className="mt-4 text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View details →
            </div>
        </div>
    )
}

export default DashboardCard
