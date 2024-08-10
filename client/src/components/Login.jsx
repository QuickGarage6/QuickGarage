/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
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
                password:password.trim(),
            });
            if (response.status === 200) {
                setSuccessMessage('Login successful!');
                localStorage.setItem('userData', JSON.stringify(response.data));
                login(selectedUserType);
                if(selectedUserType === 'garage'){
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
                confirmPassword:confirmPassword.trim(),
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
        container: 'min-h-screen flex items-center justify-center bg-gray-100 select-none',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
        register: 'm-4 sm:flex-none flex justify-center items-center text-center',
        a: 'm-2 cursor-pointer bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
        message: 'text-center my-2',
        errorMessage: 'text-red-600',
        successMessage: 'text-green-600',
        modal: 'fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50',
        modalContent: 'bg-white p-6 rounded shadow-md w-full max-w-sm',
        modalButton: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-2'
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={LoginWithCredentials}>
                <div className="mb-4">
                    <label htmlFor="emailOrPhone" className={styles.label}>Email / Phone</label>
                    <input 
                        name="emailOrPhone" 
                        type="text" 
                        placeholder="Enter Phone Or Email" 
                        className={styles.input} 
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password..." 
                        className={styles.input} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
                {errorMessage && <div className={`${styles.message} ${styles.errorMessage}`}>{errorMessage}</div>}
                {successMessage && <div className={`${styles.message} ${styles.successMessage}`}>{successMessage}</div>}
                <div className="text-center mb-4">
                    <a href="#" onClick={() => setShowModal(true)} className="text-blue-500 hover:underline">Forgot Password?</a>
                </div>
                <div className={styles.register}>
                    <span>Don't have an account? </span>
                    {selectedUserType === 'garage' ? (
                        <Link to="/garage-register" className={styles.a}>create an account</Link>
                    ) : (
                        <Link to="/user-register" className={styles.a}>create an account</Link>
                    )}
                </div>
            </form>

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <form onSubmit={handlePasswordReset}>
                            <div className="mb-4">
                                <label htmlFor="resetEmail" className={styles.label}>Email</label>
                                <input 
                                    type="email" 
                                    id="resetEmail" 
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
                                    type="password" 
                                    id="newPassword" 
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
                                    type="password" 
                                    id="confirmPassword" 
                                    placeholder="Confirm new password" 
                                    className={styles.input} 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.modalButton}>Reset Password</button>
                        </form>
                        {errorMessageReset && <div className={`${styles.message} ${styles.errorMessage}`}>{errorMessageReset}</div>}
                        {successMessageReset && <div className={`${styles.message} ${styles.successMessageReset}`}>{successMessage}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
