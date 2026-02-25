import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { FiPhone, FiLock } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('PHONE'); // PHONE or OTP
    const [loading, setLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const recaptchaVerifierRef = React.useRef(null);

    useEffect(() => {
        // Initialize Recaptcha
        const initRecaptcha = async () => {
            if (!recaptchaVerifierRef.current && document.getElementById('recaptcha-container')) {
                try {
                    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                        'size': 'invisible',
                        'callback': (response) => {
                            console.log("Recaptcha verified");
                        },
                        'expired-callback': () => {
                            console.log("Recaptcha expired");
                        }
                    });
                    // Render logic if needed, invisible handles it auto usually
                } catch (err) {
                    console.error("Recaptcha Init Error", err);
                }
            }
        };
        initRecaptcha();
    }, []);

    const handleSendOtp = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error("Please enter a valid phone number");
            return;
        }

        setLoading(true);

        const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
        const appVerifier = recaptchaVerifierRef.current;

        console.log("Debug Auth:", auth);
        console.log("Debug Number:", formattedNumber);
        console.log("Debug Verifier:", appVerifier);

        if (!appVerifier) {
            toast.error("Recaptcha not initialized. Please refresh.");
            setLoading(false);
            return;
        }

        try {
            const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
            setConfirmationResult(confirmation);
            setStep('OTP');
            toast.success("OTP Sent Successfully!");
        } catch (error) {
            console.error("SignIn Error:", error);
            toast.error(error.message || "Failed to send OTP");
            if (recaptchaVerifierRef.current) {
                try {
                    recaptchaVerifierRef.current.clear();
                    recaptchaVerifierRef.current = null;
                    // Re-init happens on effect logic or manually
                } catch (e) { console.error(e) }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;

            // 1. Call Login API
            // Ensure we send only the 10-digit number to the backend, removing +91 if present in input
            const sanitizedMobile = phoneNumber.replace(/^\+91/, '').replace(/^\+/, '');
            const apiRes = await API.login({
                mobile: sanitizedMobile,
                deviceId: '66b5f7b47c6a9a001c6d8e52' // Hardcoded valid ObjectId for web testing
            });

            if (apiRes.Status === 'success' && apiRes.token && apiRes.expertId) {

                // 2. Set Auth Header
                axios.defaults.headers.common['Authorization'] = `Bearer ${apiRes.token}`;

                // 3. Fetch Dashboard Data (Validation Step)
                const dashboardRes = await API.getUserForDashboard({
                    expertId: apiRes.expertId,
                    day: moment().format("DD MMM YYYY"),
                    filterType: ""
                });

                if (dashboardRes.status === 'error') {
                    toast.error(dashboardRes.message || "Failed to fetch dashboard data");
                    setLoading(false);
                    return;
                }

                // 4. Success - Store Session and Navigate
                login(apiRes.expertId, apiRes.token);
                toast.success("Login Successful!");
                navigate('/dashboard');

            } else {
                toast.error(apiRes.Message || "Backend login failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid OTP or Verification Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-600 mb-2">Grad Expert</h1>
                    <p className="text-gray-500">Expert Panel Access</p>
                </div>

                <div id="recaptcha-container"></div>

                {step === 'PHONE' ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="Enter mobile number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm tracking-widest"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        <button
                            onClick={() => setStep('PHONE')}
                            className="w-full text-center text-sm text-primary-600 hover:text-primary-500"
                        >
                            Change Phone Number
                        </button>
                    </div>
                )}
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default LoginScreen;
