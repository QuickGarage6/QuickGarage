/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { login, userType } = useAuth();
    const [selectedUserType, setSelectedUserType] = useState(userType);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageReset, setErrorMessageReset] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [successMessageReset, setSuccessMessageReset] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const LoginWithCredentials = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        const url = selectedUserType === 'garage'
            ? 'http://localhost:8080/api/garage/signin'
            : 'http://localhost:8080/api/user/signin';

        try {
            const response = await axios.post(url, {
                userName: emailOrPhone,
                password: password.trim(),
            });
            if (response.status === 200) {
                setSuccessMessage('Login successful!');
                localStorage.setItem('userData', JSON.stringify(response.data));
                login(selectedUserType);
                if (selectedUserType === 'garage') {
                    navigate('/home');
                }
            } else {
                setErrorMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred while logging in.');
        }
    };

    const handleUserTypeChange = (type) => {
        setSelectedUserType(type);
    };

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessageReset('Passwords do not match.');
            return;
        }
        const url = selectedUserType === 'garage'
            ? 'http://localhost:8080/api/garage/forget-password'
            : 'http://localhost:8080/api/user/forget-password';

        try {
            await axios.put(url, {
                newPassword: newPassword.trim(),
                confirmPassword: confirmPassword.trim(),
                username: resetEmail,
            });
            setSuccessMessageReset('Password has been reset successfully.');
            setShowModal(false);
        } catch (error) {
            console.error('Password reset error:', error);
            setErrorMessageReset('An error occurred while resetting the password.');
        }
    };

    const styles = {
        container: 'relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900',
        form: 'bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10',
        label: 'block text-gray-800 text-sm font-medium mb-2',
        input: 'w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400 transition-transform transform focus:scale-105',
        button: 'w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition duration-300 transform hover:scale-105',
        register: 'mt-4 text-center',
        a: 'text-blue-600 hover:text-blue-800 transition-colors duration-300 underline',
        message: 'text-center my-4',
        errorMessage: 'text-red-600 font-medium',
        successMessage: 'text-green-600 font-medium',
        forgotPasswordLink: 'text-gray-500 hover:text-gray-700 transition-colors duration-300 underline',
        modal: 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50',
        modalContent: 'bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-95 hover:scale-100 z-60',
        modalButton: 'w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 my-4',
        cancelButton: 'w-full bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition duration-300 transform hover:scale-105',
        backgroundCircle: 'absolute w-64 h-64 bg-gradient-to-r from-gray-500 to-gray-800 rounded-full opacity-50 animate-pulse',
        backgroundCircle1: 'top-10 right-10',
        backgroundCircle2: 'bottom-20 left-20',
        backgroundCircle3: 'bottom-10 right-20'
    };
    
    return (
        <div className={styles.container}>
            {/* Background Circles */}
            <motion.div 
                className={`${styles.backgroundCircle} ${styles.backgroundCircle1}`} 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-hidden="true"
            />
            <motion.div 
                className={`${styles.backgroundCircle} ${styles.backgroundCircle2}`} 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-hidden="true"
            />
            <motion.div 
                className={`${styles.backgroundCircle} ${styles.backgroundCircle3}`} 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-hidden="true"
            />

            <motion.form 
                className={styles.form}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={LoginWithCredentials}
            >
                <div className="mb-6">
                    <label htmlFor="emailOrPhone" className={styles.label}>Email / Phone</label>
                    <input
                        id="emailOrPhone"
                        name="emailOrPhone"
                        type="text"
                        placeholder="Enter Phone Or Email"
                        className={styles.input}
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter Your Password..."
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
                {errorMessage && <div className={`${styles.message} ${styles.errorMessage}`}>{errorMessage}</div>}
                {successMessage && <div className={`${styles.message} ${styles.successMessage}`}>{successMessage}</div>}
                <div className="text-center mb-4">
                    <button type="button" onClick={() => setShowModal(true)} className={styles.forgotPasswordLink}>Forgot Password?</button>
                </div>
                <div className={styles.register}>
                    <span>Don't have an account? </span>
                    {selectedUserType === 'garage' ? (
                        <Link to="/garage-register" className={styles.a}>Create an account</Link>
                    ) : (
                        <Link to="/user-register" className={styles.a}>Create an account</Link>
                    )}
                </div>
            </motion.form>

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <motion.div 
                        className={styles.modalContent} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                        <form onSubmit={handlePasswordReset}>
                            <div className="mb-4">
                                <label htmlFor="resetEmail" className={styles.label}>Email</label>
                                <input
                                    id="resetEmail"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={styles.input}
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className={styles.label}>New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    className={styles.input}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    className={styles.input}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.modalButton}>Reset Password</button>
                            <button type="button" onClick={() => setShowModal(false)} className={styles.cancelButton}>Cancel</button>
                            {errorMessageReset && <div className={`${styles.message} ${styles.errorMessage}`}>{errorMessageReset}</div>}
                            {successMessageReset && <div className={`${styles.message} ${styles.successMessage}`}>{successMessageReset}</div>}
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Login;
