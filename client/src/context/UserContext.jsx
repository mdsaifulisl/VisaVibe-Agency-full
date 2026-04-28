import React, { createContext, useState, useCallback, useEffect } from "react";
import { 
    getAllUsers as fetchAllUsersApi, 
    updateUser as updateUserApi,
    createUser as createUserApi ,
    deleteUser as deleteUserApi,
    getUserById as getUserByIdApi
} from "../api/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    

    // ১. সব মেম্বার ডাটা লোড করা
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchAllUsersApi();
            if (response.success) setUsers(response.data);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // ২. নির্দিষ্ট মেম্বার ডাটা লোড করা (Edit Page এর জন্য)
    const fetchUserById = async (id) => {
        setLoading(true);
        try {
            const response = await getUserByIdApi(id);
            if (response.success) {
                setSelectedUser(response.data);
                return response.data;
            }
        } catch (err) {
            console.error("Fetch User Error:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // ৩. আপডেট ফাংশন
    const handleUpdateUser = async (id, formData) => {
        try {
            const response = await updateUserApi(id, formData);
            if (response.success) {
                // UI স্টেট আপডেট (সরাসরি ম্যাপ করে নতুন ডাটা বসিয়ে দেওয়া)
                setUsers(prevUsers => 
                    prevUsers.map(user => user.id === Number(id) ? response.data : user)
                );
                return { success: true };
            }
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    // ৪. নতুন মেম্বার ক্রিয়েট ফাংশন
    const handleAddUser = async (formData) => {
        try {
            const response = await createUserApi(formData);
            if (response.success) {
                // নতুন মেম্বারকে লিস্টের সবার উপরে যোগ করা
                setUsers(prevUsers => [response.data, ...prevUsers]);
                return { success: true };
            }
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    // ৫. ডিলিট ফাংশন
    const handleDeleteUser = async (id) => {
        if (!window.confirm("আপনি কি নিশ্চিত যে এই মেম্বারটিকে ডিলিট করতে চান?")) return;

        try {
            const response = await deleteUserApi(id);
            if (response.success) {
                // স্টেট থেকে ওই আইডি বাদ দিয়ে দেওয়া
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                return { success: true };
            }
        } catch (err) {
            console.error("Delete Error:", err);
            return { success: false, message: err.message };
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <UserContext.Provider value={{ 
            users, 
            loading, 
            selectedUser, // নতুন যোগ করা হয়েছে
            fetchUsers, 
            fetchUserById, // নতুন যোগ করা হয়েছে
            handleUpdateUser, 
            handleAddUser, 
            handleDeleteUser 
        }}>
            {children}
        </UserContext.Provider>
    );
};