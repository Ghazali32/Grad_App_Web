import axios from 'axios';
import Config from '../config';

const login = async (data) => {
    try {
        const res = await axios.post(`${Config.url}/api/auth/login`, data);
        return {
            Status: 'success',
            Message: res.data.message,
            token: res.data.token,
            expertId: res.data.userId,
        };
    } catch (e) {
        if (e.response) {
            return { Status: 'error', ...e.response.data };
        }
        return { Status: 'error', Message: 'Network Error' };
    }
};

const getUserForDashboard = async ({ expertId, day, filterType }) => {
    try {
        const res = await axios.post(`${Config.url}/api/expert/connectedUsersDashboard`, {
            expertId,
            day,
            filterType
        });
        return { status: 'success', patientList: res.data.connectedUserList };
    } catch (e) {
        if (e.response && e.response.data) {
            return { status: 'error', ...e.response.data };
        }
        return { status: 'error', message: e.message };
    }
};

export default {
    login,
    getUserForDashboard
};
