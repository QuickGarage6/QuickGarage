import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GarageRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ownerName: '',
        garageName: '',
        mobileNo: '',
        email: '',
        serviceType: '',
        addressDto: {
            streetAddress: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        },
        licenseNumber: '',
        yrsOfOperation: '',
        password: '',
        confirmPassword: ''
    });
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.addressDto) {
            setFormData(prevData => ({
                ...prevData,
                addressDto: {
                    ...prevData.addressDto,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
        if (errors[name]) {
            validateForm();
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateMobileNo = (mobileNo) => /^\d{10}$/.test(mobileNo);

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.ownerName) {
            valid = false;
            newErrors.ownerName = 'Owner name is required.';
        }
        if (!formData.garageName) {
            valid = false;
            newErrors.garageName = 'Garage name is required.';
        }
        if (!validateMobileNo(formData.mobileNo)) {
            valid = false;
            newErrors.mobileNo = 'Invalid mobile number. Must be 10 digits.';
        }
        if (!validateEmail(formData.email)) {
            valid = false;
            newErrors.email = 'Invalid email address.';
        }
        if (!formData.password) {
            valid = false;
            newErrors.password = 'Password is required.';
        }
        if (formData.password !== formData.confirmPassword) {
            valid = false;
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!formData.addressDto.streetAddress) {
            valid = false;
            newErrors.streetAddress = 'Street address is required.';
        }
        if (!formData.addressDto.city) {
            valid = false;
            newErrors.city = 'City is required.';
        }
        if (!formData.addressDto.state) {
            valid = false;
            newErrors.state = 'State is required.';
        }
        if (!formData.addressDto.country) {
            valid = false;
            newErrors.country = 'Country is required.';
        }
        if (!formData.addressDto.zipCode) {
            valid = false;
            newErrors.zipCode = 'Zip code is required.';
        }
        if (!formData.licenseNumber) {
            valid = false;
            newErrors.licenseNumber = 'License number is required.';
        }
        if (!formData.yrsOfOperation) {
            valid = false;
            newErrors.yrsOfOperation = 'Years of operation is required.';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/garage/signup', {
                ...formData,
                latitude,
                longitude
            });
            if(response.status === 200){
                setMessageType('success');
                setMessage('Registration successful!');
                navigate('/login');
            }

        } catch (error) {
            setMessageType('error');
            setMessage(error.response?.data?.message || 'An error occurred while registering.');
        }
    };

    const getLocation = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setMessageType('error');
            setMessage("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMessageType('success');
        setMessage("Location detected successfully. Proceed with registration.");
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setMessageType('error');
                setMessage("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setMessageType('error');
                setMessage("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setMessageType('error');
                setMessage("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setMessageType('error');
                setMessage("An unknown error occurred.");
                break;
            default:
                setMessageType('error');
                setMessage("An unknown error occurred");
                break;
        }
    };

    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 pt-24 relative',
        form: 'bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10',
        title: 'text-2xl font-bold mb-4 text-center text-gray-900',
        label: 'block text-gray-900 text-sm font-semibold mb-2',
        input: 'w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300',
        button: 'w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300',
        error: 'text-red-500 text-xs italic mt-1',
        message: 'text-center py-2 my-2 rounded',
        success: 'bg-green-100 text-green-600 border border-green-300',
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
            <motion.div
                className={styles.form}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>Garage Registration</h1>
                <form onSubmit={handleSubmit}>
                    {['ownerName', 'garageName', 'mobileNo', 'email', 'serviceType', 'streetAddress', 'city', 'state', 'country', 'zipCode', 'licenseNumber', 'yrsOfOperation', 'password', 'confirmPassword'].map((field, idx) => (
                        <motion.div
                            className="mb-4"
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <label htmlFor={field} className={styles.label}>
                                {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            </label>
                            <input
                                type={field.includes('password') ? 'password' : 'text'}
                                name={field}
                                id={field}
                                className={styles.input}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                            {errors[field] && <p className={styles.error}>{errors[field]}</p>}
                        </motion.div>
                    ))}
                    <div className="flex gap-4 mb-4">
                        <button type="button" className={styles.button} onClick={getLocation}>
                            Get Location
                        </button>
                    </div>
                    {message && (
                        <div className={`${styles.message} ${messageType === 'success' ? styles.success : 'bg-red-100 text-red-600 border border-red-300'}`}>
                            {message}
                        </div>
                    )}
                    <button type="submit" className={styles.button}>
                        Register Garage
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className={styles.link}>
                        Already have an account? Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default GarageRegister;
