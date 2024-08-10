import { Link , useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useState } from "react";
import axios from "axios";

const EditGarage = () => {
    const { username } = useParams();
    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gray-100 p-4',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:italic placeholder:text-sm',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
        formItem: 'mb-4',
        formItemHalf: 'w-full md:w-1/2 px-2',
        message: 'text-center py-2 my-2 rounded',
        successMessage: 'bg-green-100 text-green-600 border border-green-300',
        errorMessage: 'bg-red-100 text-red-600 border border-red-300',
        backToLogin: 'flex m-4 p-4 text-center flex justify-center items-center'
    };

    const [formData, setFormData] = useState({
        ownerName: '',
        garageName: '',
        mobileNo: '',
        email: '',
        latitude:'',
        longitude:'',
        serviceType: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        },
        licenseNumber: '',
        yrsOfOperation: '',
    });
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.address) {
            setFormData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
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
    const fetchData = async() => {
        try {
            const response = await axios.get(`http://localhost:8080/api/garage/email?email=${encodeURIComponent(username)}`, {
                ...formData,
                latitude,
                longitude
            });
            const data = response.data;
            setFormData(data);
            setMessageType('success');
            setMessage('');
        } catch (error) {
            console.error("Error:", error);
            setMessageType('error');
            setMessage(error.response?.data?.message || 'An error occurred while registering.');
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
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
            const response = await axios.put(`http://localhost:8080/api/garage/${username}/update-garage`, {
                ...formData,
                latitude,
                longitude
            });
            setMessage(response.data);
        } catch (error) {
            console.error("Error:", error);
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
    <div className={styles.container}>
            <div className={styles.form}>
                <h1 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center mx-8 my-4">Edit Garage Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formItem}>
                        <label htmlFor="ownerName" className={styles.label}>Owner Name</label>
                        <input type="text" name="ownerName" placeholder="Enter name..." className={`${styles.input} ${errors.ownerName ? 'border-red-500' : ''}`} value={formData.ownerName} onChange={handleChange} />
                        {errors.ownerName && <p className="text-red-500 text-xs">{errors.ownerName}</p>}
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="garageName" className={styles.label}>Garage Name</label>
                        <input type="text" name="garageName" placeholder="Enter Garage name..." className={`${styles.input} ${errors.garageName ? 'border-red-500' : ''}`} value={formData.garageName} onChange={handleChange} />
                        {errors.garageName && <p className="text-red-500 text-xs">{errors.garageName}</p>}
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="mobileNo" className={styles.label}>Mobile No.</label>
                            <input type="text" name="mobileNo" placeholder="Enter mobile number..." className={`${styles.input} ${errors.mobileNo ? 'border-red-500' : ''}`} value={formData.mobileNo} onChange={handleChange} />
                            {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo}</p>}
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="serviceType" className={styles.label}>Service Type</label>
                            <input type="text" name="serviceType" placeholder="Enter service type..." className={`${styles.input} ${errors.serviceType ? 'border-red-500' : ''}`} value={formData.serviceType} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" name="email" placeholder="Enter email address..." className={`${styles.input} ${errors.email ? 'border-red-500' : ''}`} value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="streetAddress" className={styles.label}>Street Address</label>
                        <input type="text" name="streetAddress" placeholder="Enter street address..." className={`${styles.input} ${errors.streetAddress ? 'border-red-500' : ''}`} value={formData.address.streetAddress} onChange={handleChange} />
                        {errors.streetAddress && <p className="text-red-500 text-xs">{errors.streetAddress}</p>}
                    </div>                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="city" className={styles.label}>City</label>
                            <input type="text" name="city" placeholder="Enter city..." className={`${styles.input} ${errors.city ? 'border-red-500' : ''}`} value={formData.address.city} onChange={handleChange} />
                            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="state" className={styles.label}>State/Province</label>
                            <input type="text" name="state" placeholder="Enter state or province..." className={`${styles.input} ${errors.state ? 'border-red-500' : ''}`} value={formData.address.state} onChange={handleChange} />
                            {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="zipCode" className={styles.label}>Zip Code</label>
                            <input type="text" name="zipCode" placeholder="Enter zip code..." className={`${styles.input} ${errors.zipCode ? 'border-red-500' : ''}`} value={formData.address.zipCode} onChange={handleChange} />
                            {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="country" className={styles.label}>Country</label>
                            <input type="text" name="country" placeholder="Enter country..." className={`${styles.input} ${errors.country ? 'border-red-500' : ''}`} value={formData.address.country} onChange={handleChange} />
                            {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="licenseNumber" className={styles.label}>License Number</label>
                        <input type="text" name="licenseNumber" placeholder="Enter license number..." className={`${styles.input} ${errors.licenseNumber ? 'border-red-500' : ''}`} value={formData.licenseNumber} onChange={handleChange} />
                        {errors.licenseNumber && <p className="text-red-500 text-xs">{errors.licenseNumber}</p>}
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="yrsOfOperation" className={styles.label}>Years of Operation</label>
                            <input type="text" name="yrsOfOperation" placeholder="Enter years of operation..." className={`${styles.input} ${errors.yrsOfOperation ? 'border-red-500' : ''}`} value={formData.yrsOfOperation} onChange={handleChange} />
                            {errors.yrsOfOperation && <p className="text-red-500 text-xs">{errors.yrsOfOperation}</p>}
                        </div>

                    </div>
                    <button type="button" onClick={getLocation} className={styles.button}>Get Location</button>
                    <div className="sr-only">
                        <input type="text" id="latitude" placeholder="latitude.." readOnly value={latitude || ''} />
                        <input type="text" id="longitude" placeholder="longitude" readOnly value={longitude || ''} />
                    </div>
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                {message && (
                    <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </div>
                )}
                <div className={styles.backToLogin}>
                    <p>Already Have an account?</p>
                    <Link to="/login" className="underline mx-4">Login</Link>
                </div>
            </div>
        </div>
  )
}

export default EditGarage
