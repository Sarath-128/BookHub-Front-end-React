import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CreateUser.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function CreateUser() {
    const [updateUser, setUpdateUser] = useState({});

    // Assign value from the input field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser({
            ...updateUser,
            [name]: value
        });
    };

    // After submitting creating new user with API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://127.0.0.1:8000/create_user/`, updateUser);
            toast.success("User created successfully");
        } catch (error) {
            toast.error("User creation failed!");
        }
    };

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []); 

    return (
        <>
            <div className='container create full-height px-lg-5' style={{ width: '40%', marginBottom: 50, borderRadius: '10px' }}>
                {/* User creation form */}
                <div className='innerDiv p-3 ' data-aos="fade-up" data-aos-delay="300">
                    <h2 style={{ marginBottom: "19px", textAlign: 'center' }}>
                        Create <span className='text-warning'>User</span>
                    </h2>

                    <form className="row g-2 needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="col-md-4 position-relative">
                            <label htmlFor="validationTooltip01" className="form-label">Name</label>
                            <input type="text" className="form-control inpu" name='name' id="validationTooltip01" onChange={handleInputChange} required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-8 position-relative">
                            <label htmlFor="validationTooltip03" className="form-label">Email</label>
                            <input type="email" className="form-control inpu" name='email' id="validationTooltip03" onChange={handleInputChange} required />
                            <div className="invalid-tooltip">
                                Please provide a valid email.
                            </div>
                        </div>

                        <div className="col-md-3 position-relative">
                            <label htmlFor="validationTooltip05" className="form-label">Phone</label>
                            <input type="text" className="form-control inpu" style={{ width: '100px' }} name='phone' id="validationTooltip05" onChange={handleInputChange} required />
                            <div className="invalid-tooltip">
                                Please provide a valid phone number.
                            </div>
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button className="btn btn-outline-warning" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
