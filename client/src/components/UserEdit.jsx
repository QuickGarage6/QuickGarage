import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
    const { username } = useParams(); // Assuming you're getting the email via route params
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user data to display in readonly fields
        if (username) {
            axios.get(`/api/user/email?email=${encodeURIComponent(username)}`)
                .then(response => {
                    setUserData({
                        name: response.data.name,
                        email: response.data.email
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [username]);

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Validate password fields
        const validationErrors = {};
        if (!passwordData.currentPassword) validationErrors.currentPassword = 'Current password is required.';
        if (!passwordData.newPassword) validationErrors.newPassword = 'New password is required.';
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            validationErrors.confirmNewPassword = 'Passwords do not match.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        // Submit updated password to backend
        axios.put(`http://localhost:8080/api/user/${encodeURIComponent(username)}/update-password`, passwordData)
            .then(response => {
                alert('Password updated successfully!');
            })
            .catch(error => {
                console.error('Error updating password:', error);
                setErrors({ apiError:'Failed to update password.' });
            })
            .finally(() => setLoading(false));
    };

    const styles = {
        container: 'max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mt-24',
        form: 'mb-4',
        heading: 'text-xl font-semibold text-center mb-4',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        error: 'text-red-500 text-xs italic',
        button: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        link: 'text-blue-500 hover:text-blue-700',
        inputWrapper: 'mb-4'
    };

    return (
        <div className={styles.container}>
            <motion.form
                onSubmit={handlePasswordUpdate}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.heading}>Change Password</h2>
                
                <div className={styles.inputWrapper}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        name="name"
                        type="text"
                        className={styles.input}
                        value={userData.name}
                        readOnly
                    />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        name="email"
                        type="email"
                        className={styles.input}
                        value={userData.email}
                        readOnly
                    />
                </div>
                
                {['currentPassword', 'newPassword', 'confirmNewPassword'].map((field, idx) => (
                    <motion.div
                        className={styles.inputWrapper}
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                        <label
                            htmlFor={field}
                            className={styles.label}
                        >
                            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            name={field}
                            type="password"
                            placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                            className={styles.input}
                            value={passwordData[field]}
                            onChange={handlePasswordChange}
                        />
                        {errors[field] && <p className={styles.error}>{errors[field]}</p>}
                    </motion.div>
                ))}
                
                {errors.apiError && <p className={styles.error}>{errors.apiError}</p>}
                
                <motion.button
                    type="submit"
                    className={styles.button}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default ChangePassword;
