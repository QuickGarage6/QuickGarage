import { Link } from "react-router-dom";
import { useState } from "react";
const GarageRegister = () => {
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
        backToLogin:'flex m-4 p-4 text-center flex justify-center items-center'
    };

    const [formData, setFormData] = useState({
        fullName: '',
        mobileNo: '',
        serviceType: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        licenseNumber: '',
        yearsOfOperation: '',
        serviceHours: ''
    });
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === '') {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setMessageType('error');
            setMessage('Please fill in all the fields.');
            return;
        }

        try {
            const response = await fetch('/api/garage-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    latitude,
                    longitude
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessageType('success');
                setMessage('Registration successful!');
            } else {
                setMessageType('error');
                setMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred while registering.');
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
                setMessage("An unknown error occurred.");
                break;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center mx-8 my-4">Garage Register</h1>
                {message && (
                    <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formItem}>
                        <label htmlFor="fullName" className={styles.label}>Full Name</label>
                        <input type="text" name="fullName" placeholder="Enter full name..." className={styles.input} value={formData.fullName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="mobileNo" className={styles.label}>Mobile No.</label>
                            <input type="text" name="mobileNo" placeholder="Enter mobile number..." className={styles.input} value={formData.mobileNo} onChange={handleChange} />
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="serviceType" className={styles.label}>Service Type</label>
                            <input type="text" name="serviceType" placeholder="Enter service type..." className={styles.input} value={formData.serviceType} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="streetAddress" className={styles.label}>Street Address</label>
                        <input type="text" name="streetAddress" placeholder="Enter street address..." className={styles.input} value={formData.streetAddress} onChange={handleChange} />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="city" className={styles.label}>City</label>
                            <input type="text" name="city" placeholder="Enter city..." className={styles.input} value={formData.city} onChange={handleChange} />
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="state" className={styles.label}>State/Province</label>
                            <input type="text" name="state" placeholder="Enter state or province..." className={styles.input} value={formData.state} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="postalCode" className={styles.label}>Postal Code</label>
                            <input type="text" name="postalCode" placeholder="Enter postal code..." className={styles.input} value={formData.postalCode} onChange={handleChange} />
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="country" className={styles.label}>Country</label>
                            <input type="text" name="country" placeholder="Enter country..." className={styles.input} value={formData.country} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="licenseNumber" className={styles.label}>License Number</label>
                        <input type="text" name="licenseNumber" placeholder="Enter license number..." className={styles.input} value={formData.licenseNumber} onChange={handleChange} />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className={styles.formItemHalf}>
                            <label htmlFor="yearsOfOperation" className={styles.label}>Years of Operation</label>
                            <input type="text" name="yearsOfOperation" placeholder="Enter years of operation..." className={styles.input} value={formData.yearsOfOperation} onChange={handleChange} />
                        </div>
                        <div className={styles.formItemHalf}>
                            <label htmlFor="serviceHours" className={styles.label}>Service Hours</label>
                            <input type="text" name="serviceHours" placeholder="Enter service hours..." className={styles.input} value={formData.serviceHours} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="button" onClick={getLocation} className={styles.button}>Get Location</button>
                    <div className="hidden">
                        <input type="text" id="latitude" placeholder="latitude.." readOnly value={latitude || ''} />
                        <input type="text" id="longitude" placeholder="longitude" readOnly value={longitude || ''} />
                    </div>
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                <div className={styles.backToLogin}>
                    <p>Already Have an account ? </p>
                    <Link to="/login" className="underline mx-4">Login</Link>

                </div>
            </div>
        </div>
    );
};

export default GarageRegister;
