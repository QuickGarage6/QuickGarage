/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
// Reusable Form Input Component
const FormInput = ({ name, type = "text", placeholder, value, onChange, error }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{name.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:italic placeholder:text-sm ${error ? 'border-red-500' : ''}`}
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

const GarageRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
        if (formData.password !== formData.confirmPassword) {
            valid = false;
            newErrors.confirmPassword = 'Passwords do not match.';
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
            if(response.status == 200){
                setMessageType('success');
                setMessage('Registration successful!');
                login('garage');
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg">
                <h1 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center mx-8 my-4">Garage Register</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput name="ownerName" placeholder="Enter name..." value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
                    <FormInput name="garageName" placeholder="Enter Garage name..." value={formData.garageName} onChange={handleChange} error={errors.garageName} />
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="mobileNo" placeholder="Enter mobile number..." value={formData.mobileNo} onChange={handleChange} error={errors.mobileNo} />
                        <FormInput name="serviceType" placeholder="Enter service type..." value={formData.serviceType} onChange={handleChange} />
                    </div>
                    <FormInput name="email" type="email" placeholder="Enter email address..." value={formData.email} onChange={handleChange} error={errors.email} />
                    <FormInput name="streetAddress" placeholder="Enter street address..." value={formData.addressDto.streetAddress} onChange={handleChange} error={errors.streetAddress} />
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="city" placeholder="Enter city..." value={formData.addressDto.city} onChange={handleChange} error={errors.city} />
                        <FormInput name="state" placeholder="Enter state or province..." value={formData.addressDto.state} onChange={handleChange} error={errors.state} />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="zipCode" placeholder="Enter zip code..." value={formData.addressDto.zipCode} onChange={handleChange} error={errors.zipCode} />
                        <FormInput name="country" placeholder="Enter country..." value={formData.addressDto.country} onChange={handleChange} error={errors.country} />
                    </div>
                    <FormInput name="licenseNumber" placeholder="Enter license number..." value={formData.licenseNumber} onChange={handleChange} error={errors.licenseNumber} />
                    <div className="flex flex-wrap -mx-2">
                        <FormInput name="yrsOfOperation" placeholder="Enter years of operation..." value={formData.yrsOfOperation} onChange={handleChange} error={errors.yrsOfOperation} />
                        <FormInput name="password" type="password" placeholder="Enter password..." value={formData.password} onChange={handleChange} error={errors.password} />
                    </div>
                    <FormInput name="confirmPassword" type="password" placeholder="Confirm password..." value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                    <button type="button" onClick={getLocation} className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4">Get Location</button>
                    <div className="sr-only">
                        <input type="text" id="latitude" placeholder="latitude.." readOnly value={latitude || ''} />
                        <input type="text" id="longitude" placeholder="longitude" readOnly value={longitude || ''} />
                    </div>
                    <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4">Register</button>
                </form>
                {message && (
                    <div className={`text-center py-2 my-2 rounded ${messageType === 'success' ? 'bg-green-100 text-green-600 border border-green-300' : 'bg-red-100 text-red-600 border border-red-300'}`}>
                        {message}
                    </div>
                )}
                <div className="flex m-4 p-4 text-center flex justify-center items-center">
                    <Link to="/login" className="text-gray-700 hover:text-gray-900 text-lg">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default GarageRegister;
