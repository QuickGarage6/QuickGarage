import './UserDetails.css'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import AdminHeader from './AdminHeader'
const UserDetailsCard = () => {

    const [userdata, setUserData] = useState([]);

    const fetchUsers = async () => {
        try {
            const resp = await fetch("http://localhost:8080/api/admin/users");
            if (!resp.ok) {
                throw new Error("network problem")
            }
            const result = await resp.json();
            setUserData(result);
        } catch (error) {
            console.log("user data error => " + error)
        }
    };

    //fetch user data from backend
    useEffect(() => {
        fetchUsers();
    }, [])

    const handleDelete = async (userId) => {
        const result = window.confirm('Are you sure you want to delete this record?');
        console.log(userId);
        if (result) {
            try {
                const resp = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                    method: 'DELETE',
                });
                if (!resp.ok) {
                    throw new Error("network problem")
                }
                toast.success("Record successfully deleted!", {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                fetchUsers();
            } catch (error) {
                console.log("user delete error => " + error)
            }
        }
    }


    return (
        <>
        <AdminHeader></AdminHeader>
            <div>
                <table className='user-table'>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Mobile No.</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userdata.length === 0 && (
                            <tr>
                                <td colSpan="5" className="errorMsg">No data found</td>
                            </tr>
                        )}
                        {userdata.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobileNo}</td>
                                <td>
                                    <div className='btn'>
                                        {/* <Link to={`/user-edit/${encodeURIComponent(user.email)}`} state={{user}} id='btn1'>Edit</Link> */}
                                        <button id='btn2' onClick={() => handleDelete(user.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ToastContainer />
            </div>
        </>
    )
}

export default UserDetailsCard
