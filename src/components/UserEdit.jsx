import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const UserEdit = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const{user} = location.state || {};
    const{email} = useParams();
    const[formData, setFormData] = useState({
        id: 0,
        name: "",
        mobileNo: "",
        email: ""
    })
    const[currentPassword, setCurrentPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');

    const styles = {
        container: 'min-h-screen flex items-center justify-center bg-gray-100 p-4',
        form: 'bg-white p-8 rounded shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        opText : 'w-full p-3 py-2 text-gray-800',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:italic placeholder:text-sm',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4',
        formItem: 'mb-4',
        formItemHalf: 'w-full md:w-1/2 px-2',
    };

    const updateFormData = (newData)=>{
        setFormData(prevState => ({
            ...prevState,
            ...newData,
        }))
    }

    useEffect(()=>{
        updateFormData(user);
       console.log('user email ',email);
    },[]);

    const handleCurrentPass = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPass = (e) =>{
        setNewPassword(e.target.value);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            
            const response = await axios.put(`http://localhost:7070/api/user/${email}/update-password`, {
                currentPassword,
                newPassword
            });
            if(!response.ok){
                console.log("error ");
            }
            toast.success("Record Updated Successfully!",{
                position:"top-center",
                autoClose:3000,
                closeOnClick:true,
                pauseOnHover:false,
            });
            
            const timer = setTimeout(() => {
                navigate('/admin/user-card');
            }, 3500);
            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Error:", error);
        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.form}>
        <h1 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center mx-8 my-4">Edit User Details</h1>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 p-3">
            <div className={styles.formItemHalf}>
                <label  className={styles.label}>User Name</label>
                <span  className={styles.opText} >{formData.name}</span>
            </div>
            <div className={styles.formItemHalf}>
                <label  className={styles.label}>User Email</label>
                <span  className={styles.opText} >{formData.email}</span>
            </div>
        </div>
        <div className="flex flex-wrap -mx-2 -p-3">
            <div className={styles.formItemHalf}>
                <label htmlFor="currentPassword" className={styles.label}>Old Password</label>
                <input type='password' name='currentPassword' className={styles.input}  placeholder='Enter password' onChange={handleCurrentPass} value={currentPassword || ''}/>
            </div>
            <div className={styles.formItemHalf}>
                <label htmlFor="newPassword" className={styles.label}>Confirm Password</label>
                <input type='password' name='newPassword' className={styles.input}  placeholder='New password' onChange={handleNewPass} value={newPassword || ''}></input>
            </div>
        </div>
        <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserEdit
