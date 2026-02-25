import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX, FiFilter, FiSettings } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

import API from '../api'
import { useAuth } from '../store/AuthContext'
import Loader from '../components/Loader'
import DashboardCard from '../components/DashboardCard'
import NoDataCard from '../components/NoDataCard'

const DashboardScreen = () => {
    const navigate = useNavigate()
    const { user, token } = useAuth()

    const [loading, setLoading] = useState(true)
    const [fullPatientList, setFullPatientList] = useState([])
    const [displayedList, setDisplayedList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [filterModalOpen, setFilterModalOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(8)

    const getFilterType = (index) => {
        switch (index) {
            case 0: return '1'
            case 2: return '0'
            case 4: return 'yes'
            case 6: return 'no'
            default: return ''
        }
    }

    const fetchPatients = async (filterType = '') => {
        setLoading(true)
        const expertId = localStorage.getItem('expertId')

        if (!expertId) {
            toast.error('Session invalid. Please login again.')
            navigate('/login')
            return
        }

        try {
            const res = await API.getUserForDashboard({
                expertId,
                day: moment().format('DD MMM YYYY'),
                filterType
            })

            if (res.status === 'success') {
                const list = (res.patientList || []).sort((a, b) => {
                    const activeA = a.userId?.updateDate && Math.abs(moment(a.userId.updateDate).diff(new Date(), 'days')) <= 3
                    const activeB = b.userId?.updateDate && Math.abs(moment(b.userId.updateDate).diff(new Date(), 'days')) <= 3
                    return activeB - activeA
                })

                setFullPatientList(list)
                setDisplayedList(list)
            } else {
                toast.error(res.message || 'Failed to fetch patients')
            }
        } catch {
            toast.error('Network error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPatients()
    }, [])

    useEffect(() => {
        if (!searchText) {
            setDisplayedList(fullPatientList)
            return
        }

        const text = searchText.toLowerCase()
        setDisplayedList(
            fullPatientList.filter(item =>
                item.userId?.mobile?.includes(text) ||
                item.userId?.name?.toLowerCase().includes(text)
            )
        )
    }, [searchText, fullPatientList])

    const handleFilterChange = (index) => {
        setSelectedFilter(index)
        setFilterModalOpen(false)
        fetchPatients(getFilterType(index))
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="sticky top-0 z-40 bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by name or mobile"
                            className="w-full pl-10 pr-10 py-2.5 border rounded-md focus:ring-2 focus:ring-primary-400 outline-none"
                        />
                        {searchText && (
                            <button
                                onClick={() => setSearchText('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                        <FiFilter />
                        Filters
                    </button>

                    <button
                        onClick={() => navigate('/menu')}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <FiSettings size={20} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Assigned Patients</h1>
                <button
                    onClick={() => navigate('/add-patient')}
                    className="bg-primary-600 text-white px-5 py-2.5 rounded-md hover:bg-primary-700 transition"
                >
                    + Add Patient
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-10">
                {loading ? (
                    <Loader />
                ) : displayedList.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                        {displayedList.map((item, index) => {
                            const isActive =
                                item.userId?.updateDate &&
                                Math.abs(moment(item.userId.updateDate).diff(new Date(), 'days')) <= 3

                            return (
                                <DashboardCard
                                    key={item.userId?._id || index}
                                    name={item.userId?.name}
                                    profilePic={item.userId?.profilePic}
                                    patientId={item.userId?._id}
                                    gender={item.userId?.gender}
                                    status={isActive}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <NoDataCard data="No connected patients" />
                )}
            </div>

            {filterModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-lg shadow-xl">
                        <div className="px-5 py-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Filters</h3>
                            <button onClick={() => setFilterModalOpen(false)}>
                                <FiX />
                            </button>
                        </div>

                        <div className="divide-y">
                            {[
                                { label: 'Parameters Provided', index: 0 },
                                { label: 'Parameters Not Provided', index: 2 },
                                { label: 'Dialysis: Yes', index: 4 },
                                { label: 'Dialysis: No', index: 6 },
                                { label: 'Clear Filters', index: 8 }
                            ].map(opt => (
                                <button
                                    key={opt.index}
                                    onClick={() => handleFilterChange(opt.index)}
                                    className={`w-full px-5 py-3 text-left hover:bg-gray-50 ${selectedFilter === opt.index
                                        ? 'bg-primary-50 text-primary-600 font-medium'
                                        : ''
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardScreen
