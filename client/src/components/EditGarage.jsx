import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditGarage = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ownerName: '',
        garageName: '',
        mobileNo: '',
        email: '',
        serviceType: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
        },
    });

    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/garage/email?email=${encodeURIComponent(username)}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching garage data:', error);
            });
    }, [username]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/garage/services')
            .then(response => {
                if (response.data.status === 'OK') {
                    setServices(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching service types:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.address) {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/garage/${encodeURIComponent(username)}/update-garage`, formData)
            .then(response => {
                toast.success('Garage updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                toast.error('Error updating garage data. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md pt-48">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Garage</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Garage Name</label>
                        <input
                            type="text"
                            name="garageName"
                            value={formData.garageName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a service type</option>
                        {services.map((service, index) => (
                            <option key={index} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.address.streetAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.address.state}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Update Garage
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditGarage;
