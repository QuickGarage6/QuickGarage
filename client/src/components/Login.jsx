import RegisterCard from "./RegisterCard";

const Login = () => {
    const LoginWithCredentials = (event) => {
        event.preventDefault();
        // Handle login with credentials
    }

    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gray-100 select-none',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={LoginWithCredentials}>
                <div className="mb-4">
                    <label htmlFor="name" className={styles.label}>Email / Phone</label>
                    <input name="name" type="text" placeholder="Enter Phone Or Email" className={styles.input} />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input type="password" placeholder="Enter Your Password..." className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Login</button>
                <RegisterCard />
            </form>
        </div>
    )
}

export default Login;
