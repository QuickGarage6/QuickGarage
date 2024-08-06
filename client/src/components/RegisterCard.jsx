import { Link } from "react-router-dom";
const RegisterCard = () => {

    const styles = {
        register: 'm-4 sm:flex-none flex justify-center items-center text-center',
        a: 'm-2 p-[4px] cursor-pointer bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
    }
    return (
        <div className={styles.register}>
            <Link to="/user-register" className={styles.a}>create an account</Link>
            <Link to="/garage-register" className={styles.a}>Register Garage</Link>
        </div>
    )
}

export default RegisterCard
