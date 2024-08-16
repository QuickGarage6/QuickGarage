import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const UserRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const formErrors = {};
        if (!formData.name.trim()) formErrors.name = "Name is required";
        if (!formData.mobileNo.trim()) formErrors.mobileNo = "Mobile No is required";
        if (!formData.email.trim()) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match";
        return formErrors;
    };

    const registerUser = async (event) => {
        event.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            setLoading(false);

            if (response.ok) {
                alert("User registered successfully!");
                setFormData({
                    name:'',
                    mobileNo: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate('/login');
            } else {
                const data = await response.json();
                alert(data.message || "Failed to register user.");
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            alert("An error occurred while registering the user.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 pt-24 relative',
        form: 'bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10',
        label: 'block text-gray-900 text-sm font-semibold mb-2',
        input: 'w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300',
        button: 'w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300',
        error: 'text-red-500 text-xs italic mt-1',
        backToLogin: 'flex flex-col items-center mt-4',
        link: 'text-blue-500 hover:underline',
        backgroundPattern: 'absolute inset-0 w-full h-full bg-opacity-30',
        animatedCircles: 'absolute top-0 left-0 w-full h-full pointer-events-none'
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundPattern}>
                <div className={styles.animatedCircles}>
                    <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.2)">
                            <animate attributeName="r" from="40" to="100" dur="15s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.3" to="0" dur="15s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="150" cy="150" r="40" fill="rgba(255,255,255,0.2)">
                            <animate attributeName="r" from="40" to="100" dur="15s" repeatCount="indefinite" begin="7s"/>
                            <animate attributeName="opacity" from="0.3" to="0" dur="15s" repeatCount="indefinite" begin="7s"/>
                        </circle>
                    </svg>
                </div>
            </div>
            <motion.form
                className={styles.form}
                onSubmit={registerUser}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {['name', 'mobileNo', 'email', 'password', 'confirmPassword'].map((field, idx) => (
                    <motion.div
                        className="mb-4"
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                        <label htmlFor={field} className={styles.label}>
                            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            {field !== 'mobileNo' && field !== 'confirmPassword' && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            name={field}
                            type={field.includes('password') ? 'password' : 'text'}
                            placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                            className={styles.input}
                            value={formData[field]}
                            onChange={handleChange}
                        />
                        {errors[field] && <p className={styles.error}>{errors[field]}</p>}
                    </motion.div>
                ))}
                <motion.button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {loading ? "Registering..." : "Register"}
                </motion.button>
                <div className={styles.backToLogin}>
                    <p className="text-gray-900">Already have an account?</p>
                    <Link to="/login" className={styles.link}>Login</Link>
                </div>
            </motion.form>
        </div>
    );
};

export default UserRegistration;