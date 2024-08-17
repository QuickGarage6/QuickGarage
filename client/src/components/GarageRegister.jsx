import { useState, useEffect } from 'react';
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
    const [serviceTypes, setServiceTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);

    useEffect(() => {
        // Fetch service types from the API
        const fetchServiceTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/garage/services');
                if (response.status === 200) {
                    setServiceTypes(response.data.data || []);
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Failed to load service types.');
            }
        };
        fetchServiceTypes();
    }, []);

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

        if (!formData.ownerName.trim()) {
            valid = false;
            newErrors.ownerName = 'Owner name is required.';
        }
        if (!formData.garageName.trim()) {
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
        if (!formData.serviceType.trim()) {
            valid = false;
            newErrors.serviceType = 'Service type is required.';
        }
        if (!formData.password.trim()) {
            valid = false;
            newErrors.password = 'Password is required.';
        }
        if (formData.password !== formData.confirmPassword) {
            valid = false;
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!formData.addressDto.streetAddress.trim()) {
            valid = false;
            newErrors.streetAddress = 'Street address is required.';
        }
        if (!formData.addressDto.city.trim()) {
            valid = false;
            newErrors.city = 'City is required.';
        }
        if (!formData.addressDto.state.trim()) {
            valid = false;
            newErrors.state = 'State is required.';
        }
        if (!formData.addressDto.country.trim()) {
            valid = false;
            newErrors.country = 'Country is required.';
        }
        if (!formData.addressDto.zipCode.trim()) {
            valid = false;
            newErrors.zipCode = 'Zip code is required.';
        }
        if (!formData.licenseNumber.trim()) {
            valid = false;
            newErrors.licenseNumber = 'License number is required.';
        }
        if (!formData.yrsOfOperation.trim()) {
            valid = false;
            newErrors.yrsOfOperation = 'Years of operation are required.';
        }

        setErrors(newErrors);
        return valid;
    };
    const handleService = (e) => {
        setFormData(prevData => ({
            ...prevData,
            serviceType: e.target.value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/garage/signup', {
                ...formData,
                latitude,
                longitude
            });
            if (response.status === 200) {
                setMessageType('success');
                setMessage('Registration successful!');
                setFormData({
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
                navigate('/login');
            }
        } catch (error) {
            setMessageType('error');
            setMessage(error.response?.data?.message || 'An error occurred while registering.');
        } finally {
            setLoading(false);
        }
    };

    const getLocation = (event) => {
        event.preventDefault();
        setGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setMessageType('error');
            setMessage("Geolocation is not supported by this browser.");
            setGettingLocation(false);
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMessageType('success');
        setMessage("Location detected successfully. Proceed with registration.");
        setGettingLocation(false);
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
                setMessage("An unknown error occurred.");
                break;
        }
        setGettingLocation(false);
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
                            <animate attributeName="r" from="40" to="100" dur="15s" repeatCount="indefinite" begin="7s" />
                            <animate attributeName="opacity" from="0.3" to="0" dur="15s" repeatCount="indefinite" begin="7s" />
                        </circle>
                    </svg>
                </div>
            </div>
            <motion.div
                className={styles.form}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.title}>Register Your Garage</h2>
               
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="ownerName">Owner Name</label>
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.ownerName && <p className={styles.error}>{errors.ownerName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="garageName">Garage Name</label>
                        <input
                            type="text"
                            id="garageName"
                            name="garageName"
                            value={formData.garageName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.garageName && <p className={styles.error}>{errors.garageName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="mobileNo">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.mobileNo && <p className={styles.error}>{errors.mobileNo}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="serviceType">Service Type</label>
                        <select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={(e) => {
                                handleChange(e);
                                handleService(e);
                            }}
                            className={styles.input}
                        >
                            <option value="">Select a service type</option>
                            {serviceTypes.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        {errors.serviceType && <p className={styles.error}>{errors.serviceType}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="addressDto.streetAddress">Street Address</label>
                        <input
                            type="text"
                            id="addressDto.streetAddress"
                            name="streetAddress"
                            value={formData.addressDto.streetAddress}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.streetAddress && <p className={styles.error}>{errors.streetAddress}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="addressDto.city">City</label>
                        <input
                            type="text"
                            id="addressDto.city"
                            name="city"
                            value={formData.addressDto.city}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.city && <p className={styles.error}>{errors.city}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="addressDto.state">State</label>
                        <input
                            type="text"
                            id="addressDto.state"
                            name="state"
                            value={formData.addressDto.state}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.state && <p className={styles.error}>{errors.state}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="addressDto.country">Country</label>
                        <input
                            type="text"
                            id="addressDto.country"
                            name="country"
                            value={formData.addressDto.country}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.country && <p className={styles.error}>{errors.country}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="addressDto.zipCode">Zip Code</label>
                        <input
                            type="text"
                            id="addressDto.zipCode"
                            name="zipCode"
                            value={formData.addressDto.zipCode}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.zipCode && <p className={styles.error}>{errors.zipCode}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="licenseNumber">License Number</label>
                        <input
                            type="text"
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.licenseNumber && <p className={styles.error}>{errors.licenseNumber}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="yrsOfOperation">Years of Operation</label>
                        <input
                            type="text"
                            id="yrsOfOperation"
                            name="yrsOfOperation"
                            value={formData.yrsOfOperation}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.yrsOfOperation && <p className={styles.error}>{errors.yrsOfOperation}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                    </div>
                    <div className="mb-4 flex justify-between">
                        <button
                            type="button"
                            className={styles.button}
                            onClick={getLocation}
                            disabled={gettingLocation}
                        >
                            {gettingLocation ? 'Detecting Location...' : 'Get Current Location'}
                        </button>
                        <button
                            type="submit"
                            className={styles.button}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                {message && (
                    <div className={`${styles.message} ${messageType === 'success' ? styles.success : ''}`}>
                        {message}
                    </div>
                )}
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className={styles.link}>Login here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default GarageRegister;
