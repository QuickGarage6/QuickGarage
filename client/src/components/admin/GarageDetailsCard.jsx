import './GarageDetails.css'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import AdminHeader from './AdminHeader';
const GarageDetailsCard = () => {

  const [garageData, setGarageData] = useState([]);

  const fetchGarages = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/admin/garages");
      if (!resp.ok) {
        throw new Error("network problem")
      }
      const result = await resp.json();
      console.log(JSON.stringify(result));
      setGarageData(result);
    } catch (error) {
      console.log("user data error => " + error)
    }
  };

  useEffect(() => {

    fetchGarages();

  }, [])

  const handleDelete = async (garageId) => {
    const result = window.confirm('Are you sure you want to delete this record?');
    console.log(garageId);
    if (result) {
      //
      try {
        const resp = await fetch(`http://localhost:8080/api/admin/garage/${garageId}`, {
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
        fetchGarages();
      } catch (error) {
        console.log("garage delete error => " + error)
      }
    }
  }


  return (
    <>
    <AdminHeader></AdminHeader>
      <div>
        <table className='garage-table'>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th> Owner Name</th>
              <th>Garage Name</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {garageData.length === 0 && (
              <tr>
                <td colSpan="5" className="errorMsg">No data found</td>
              </tr>
            )}
            {garageData.map((garage, index) => (
              <tr key={garage.id}>
                <td>{index + 1}</td>
                <td>{garage.ownerName}</td>
                <td>{garage.garageName}</td>
                <td>{garage.email}</td>
                <td>
                  {/* <Link to={`/garage-edit/${encodeURIComponent(garage.email)}`} state={{garage}} id='btn1'>Edit</Link> */}
                  <button id='btn2' onClick={() => handleDelete(garage.id)}>Delete</button>
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

export default GarageDetailsCard
