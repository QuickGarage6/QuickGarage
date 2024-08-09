import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';  // Import axios for making HTTP requests
import { useAuth } from './AuthContext';

const Login = () => {
    const { login, userType } = useAuth();
    const [selectedUserType, setSelectedUserType] = useState(userType);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const LoginWithCredentials = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        const url = selectedUserType === 'garage'
            ? 'http://backend-url/api/garage/signin'
            : 'http://backend-url/api/user/signin';

        try {
            const response = await axios.post(url, {
                emailOrPhone,
                password,
            });
            if (response.data.success) {
                setSuccessMessage('Login successful!');
                login(selectedUserType);
            } else {
                setErrorMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred while logging in.');
        }
    }

    const handleUserTypeChange = (type) => {
        setSelectedUserType(type);
    }

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
        successMessage: 'text-green-600'
    }

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
                <div className={styles.register}>
                    <span>Don't have an account? </span>
                    {selectedUserType === 'garage' ? (
                        <Link to="/garage-register" className={styles.a}>create an account</Link>
                    ) : (
                        <Link to="/user-register" className={styles.a}>create an account</Link>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Login;
