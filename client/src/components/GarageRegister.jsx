import  { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import FormInput from './FormInput'; // Import the FormInput component

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
        container: 'min-h-screen flex items-center justify-center bg-gray-100 p-4 py-48',
        form: 'bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg',
        title: 'text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center mx-8 my-4',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
        error: 'text-red-500 text-xs italic mt-1',
        message: 'text-center py-2 my-2 rounded',
        success: 'bg-green-100 text-green-600 border border-green-300',
        link: 'text-gray-700 hover:text-gray-900 text-lg'
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Garage Register</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput name="ownerName" placeholder="Enter name..." value={formData.ownerName} onChange={handleChange} error={errors.ownerName} required />
                    <FormInput name="garageName" placeholder="Enter Garage name..." value={formData.garageName} onChange={handleChange} error={errors.garageName} required />
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="mobileNo" placeholder="Enter mobile number..." value={formData.mobileNo} onChange={handleChange} error={errors.mobileNo} required />
                        <FormInput name="serviceType" placeholder="Enter service type..." value={formData.serviceType} onChange={handleChange} />
                    </div>
                    <FormInput name="email" type="email" placeholder="Enter email address..." value={formData.email} onChange={handleChange} error={errors.email} required />
                    <FormInput name="streetAddress" placeholder="Enter street address..." value={formData.addressDto.streetAddress} onChange={handleChange} error={errors.streetAddress} required />
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="city" placeholder="Enter city..." value={formData.addressDto.city} onChange={handleChange} error={errors.city} required />
                        <FormInput name="state" placeholder="Enter state or province..." value={formData.addressDto.state} onChange={handleChange} error={errors.state} required />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="zipCode" placeholder="Enter zip code..." value={formData.addressDto.zipCode} onChange={handleChange} error={errors.zipCode} required />
                        <FormInput name="country" placeholder="Enter country..." value={formData.addressDto.country} onChange={handleChange} error={errors.country} required />
                    </div>
                    <FormInput name="licenseNumber" placeholder="Enter license number..." value={formData.licenseNumber} onChange={handleChange} error={errors.licenseNumber} required />
                    <FormInput name="yrsOfOperation" placeholder="Enter years of operation..." value={formData.yrsOfOperation} onChange={handleChange} error={errors.yrsOfOperation} required />
                    <FormInput name="password" type="password" placeholder="Enter password..." value={formData.password} onChange={handleChange} error={errors.password} required />
                    <FormInput name="confirmPassword" type="password" placeholder="Confirm password..." value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    <button type="submit" className={styles.button}>Register</button>
                    <button onClick={getLocation} className={styles.button}>Get Location</button>
                    {message && (
                        <div className={`${styles.message} ${messageType === 'success' ? styles.success : 'bg-red-100 text-red-600 border border-red-300'}`}>
                            {message}
                        </div>
                    )}
                    <p className="text-center mt-4">
                        Already have an account? <Link to="/login" className={styles.link}>Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default GarageRegister;
