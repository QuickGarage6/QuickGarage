import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const formErrors = {};
        if (!formData.firstName.trim()) formErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) formErrors.lastName = "Last Name is required";
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
                    firstName: '',
                    lastName: '',
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
        container: 'min-h-screen flex items-center justify-center bg-gray-100 p-4',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
        button: 'w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300',
        error: 'text-red-500 text-xs italic',
        backToLogin: 'flex m-4 p-4 text-center justify-center items-center',
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={registerUser}>
                {['firstName', 'lastName', 'mobileNo', 'email', 'password', 'confirmPassword'].map((field, idx) => (
                    <div className="mb-4" key={idx}>
                        <label htmlFor={field} className={styles.label}>
                            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                    </div>
                ))}
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                <div className={styles.backToLogin}>
                    <p>Already have an account?</p>
                    <Link to="/login" className="underline sm:mx-2">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default UserRegistration;