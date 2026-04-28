import axiosInstance from './axiosInstance';

// ১. সব ট্যুর পাওয়ার জন্য
export const getAllTours = async () => {
    const response = await axiosInstance.get('/tours');
    return response.data;
};

// ২. নতুন ট্যুর তৈরি (ইমেজসহ)
export const createTour = async (formData) => {
    const response = await axiosInstance.post('/tours', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // ফাইল পাঠানোর জন্য এটি বাধ্যতামূলক
        },
    });
    return response.data;
};

// ৩. ট্যুর আপডেট (ইমেজসহ)
export const updateTour = async (id, formData) => {
    const response = await axiosInstance.put(`/tours/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// ৪. ট্যুর ডিলিট
export const deleteTour = async (id) => {
    const response = await axiosInstance.delete(`/tours/${id}`);
    return response.data;
}; 

// ৫. সিঙ্গেল ট্যুর দেখা
export const getTourById = async (id) => {
    const response = await axiosInstance.get(`/tours/${id}`);
    return response.data;
};

