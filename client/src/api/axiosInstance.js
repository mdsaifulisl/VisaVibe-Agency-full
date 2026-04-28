import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 10000,
});

// যদি ভবিষ্যতে JWT টোকেন ব্যবহার করেন, তবে এখানে ইন্টারসেপ্টর যোগ করা যাবে
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;