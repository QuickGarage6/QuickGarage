import { useState } from "react";
import { Link } from "react-router-dom";

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let formErrors = {};
        if (!formData.firstName) formErrors.firstName = "First Name is required";
        if (!formData.lastName) formErrors.lastName = "Last Name is required";
        if (!formData.mobileNo) formErrors.mobileNo = "Mobile No is required";
        if (!formData.email) formErrors.email = "Email is required";
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

        try {
            const response = await fetch("http://192.168.40.149:8080/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("User registered successfully!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    mobileNo: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                alert("Failed to register user.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering the user.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gray-100 p-4',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
        button: 'w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300',
        error: 'text-red-500 text-xs italic',
        backToLogin: 'flex m-4 p-4 text-center flex justify-center items-center',
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={registerUser}>
                <div className="mb-4">
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                        className={styles.input}
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                        className={styles.input}
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="mobileNo" className={styles.label}>Mobile No</label>
                    <input
                        name="mobileNo"
                        type="text"
                        placeholder="Enter Mobile No"
                        className={styles.input}
                        value={formData.mobileNo}
                        onChange={handleChange}
                    />
                    {errors.mobileNo && <p className={styles.error}>{errors.mobileNo}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Your Password..."
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Your Password..."
                        className={styles.input}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className={styles.button}>Register</button>
                <div className={styles.backToLogin}>
                    <p>Already have an account?</p>
                    <Link to="/login" className="underline sm:mx-2">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default UserRegistration;
