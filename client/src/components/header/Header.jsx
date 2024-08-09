import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [registeredData, setRegisteredData] = useState({});
    useEffect(() => {
        setRegisteredData({}); // Fetch or initialize registered data here
    }, []);
    
    const handleCard = () => {
        setIsCardOpen(!isCardOpen);
    };
    
    const username = registeredData.fullName;
    
    const styles = {
        component: 'w-full h-24 bg-transparent border-2 rounded-lg flex justify-between items-center',
        userProfile: 'w-20 h-20 hover:cursor-pointer m-auto border-2 rounded-full',
        logo: 'text-center m-auto font-bold text-xl uppercase',
        GarageCard: 'sm:w-1/4 w-full p-10 my-4 sm:h-full h-2/3 bg-red-200 fixed right-[1%] top-0 rounded-lg overflow-auto',
        formItem: 'mb-4',
        formItemHalf: 'w-full md:w-1/2 px-2',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:italic placeholder:text-sm',
        button: 'w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300 my-4 flex flex-col items-center justify-center ',
        cancel: '-rotate-90 w-10 h-10'
    };

    return (
        <div className={styles.component}>
            <div className={styles.logo}>QuickGarage</div>
            <div className={styles.userProfile} onClick={handleCard}>
                <img src="/user.svg" alt="User Profile" />
            </div>
            {isCardOpen && (
                <div className={styles.GarageCard}>
                    <button onClick={handleCard}>
                        <img src="/uparrow.svg" className={styles.cancel} alt="Cancel" />
                        <span>cancel</span>
                    </button>
                    <div>
                        <div className={styles.formItem}>
                            <label htmlFor="fullName" className={styles.label}>Full Name</label>
                            <input type="text" name="fullName" placeholder="Enter full name..." className={styles.input} value={registeredData.fullName || ''} readOnly />
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className={styles.formItemHalf}>
                                <label htmlFor="mobileNo" className={styles.label}>Mobile No.</label>
                                <input type="text" name="mobileNo" placeholder="Enter mobile number..." className={styles.input} value={registeredData.mobileNo || ''} readOnly />
                            </div>
                            <div className={styles.formItemHalf}>
                                <label htmlFor="serviceType" className={styles.label}>Service Type</label>
                                <input type="text" name="serviceType" placeholder="Enter service type..." className={styles.input} value={registeredData.serviceType || ''} readOnly />
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor="streetAddress" className={styles.label}>Street Address</label>
                            <input type="text" name="streetAddress" placeholder="Enter street address..." className={styles.input} value={registeredData.streetAddress || ''} readOnly />
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className={styles.formItemHalf}>
                                <label htmlFor="city" className={styles.label}>City</label>
                                <input type="text" name="city" placeholder="Enter city..." className={styles.input} value={registeredData.city || ''} readOnly />
                            </div>
                            <div className={styles.formItemHalf}>
                                <label htmlFor="state" className={styles.label}>State/Province</label>
                                <input type="text" name="state" placeholder="Enter state or province..." className={styles.input} value={registeredData.state || ''} readOnly />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className={styles.formItemHalf}>
                                <label htmlFor="postalCode" className={styles.label}>Postal Code</label>
                                <input type="text" name="postalCode" placeholder="Enter postal code..." className={styles.input} value={registeredData.postalCode || ''} readOnly />
                            </div>
                            <div className={styles.formItemHalf}>
                                <label htmlFor="country" className={styles.label}>Country</label>
                                <input type="text" name="country" placeholder="Enter country..." className={styles.input} value={registeredData.country || ''} readOnly />
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor="licenseNumber" className={styles.label}>License Number</label>
                            <input type="text" name="licenseNumber" placeholder="Enter license number..." className={styles.input} value={registeredData.licenseNumber || ''} readOnly />
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className={styles.formItemHalf}>
                                <label htmlFor="yearsOfOperation" className={styles.label}>Years of Operation</label>
                                <input type="text" name="yearsOfOperation" placeholder="Enter years of operation..." className={styles.input} value={registeredData.yearsOfOperation || ''} readOnly />
                            </div>
                            <div className={styles.formItemHalf}>
                                <label htmlFor="serviceHours" className={styles.label}>Service Hours</label>
                                <input type="text" name="serviceHours" placeholder="Enter service hours..." className={styles.input} value={registeredData.serviceHours || ''} readOnly />
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Link to={`/edit-garage/${username}`} className={styles.a}>Edit</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
