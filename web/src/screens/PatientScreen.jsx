import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const PatientScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 mb-4"
            >
                <FiArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-2xl font-bold">Patient Details</h1>
            <p className="text-gray-500">Patient ID: {id}</p>
            <div className="mt-8 p-8 border border-dashed border-gray-300 rounded-lg text-center text-gray-400">
                Patient Parameter List Implementation Coming Soon...
            </div>
        </div>
    );
};

export default PatientScreen;
