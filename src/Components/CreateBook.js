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

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            
        });
    }, [AOS]);

    // Image uploading function

    const handleInputImage = (e) => {
        const file = e.target.files[0]
        setUpdateUser({
            ...updateUser,
            image: file
        });
    };

    // const handleInputImage = (e)=>{
    //     const file = e.target.files[0]
    //     const formDAtaImage = new FormData()
    
    //     formDAtaImage.append("title",updateUser.title)
    //     formDAtaImage.append("author",updateUser.author)
    //     formDAtaImage.append("year",updateUser.year)
    //     formDAtaImage.append("image",file)
    
    //     setUpdateUser(formDAtaImage)
    //  }

    // After submitting creating new user with API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDAtaImage = new FormData()
        formDAtaImage.append("title",updateUser.title)
        formDAtaImage.append("author",updateUser.author)
        formDAtaImage.append("year",updateUser.year)
        formDAtaImage.append("image",updateUser.image)



        try {
            await axios.post(`http://127.0.0.1:8000/book_create/`, formDAtaImage,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },               
            });
            toast.success("Book created successfully");
        } catch (error) {
            toast.error("Book creation failed!");
        }
    };

    return (
        <>
            <div className='bodyback full-height px-lg-5'>
                <div className='container create ' style={{ width: '40%', borderRadius: '10px' }} data-aos="fade-up" data-aos-delay="300">
                    <div className='innerDiv p-3 animate' data-aos="fade-up" data-aos-delay="300">
                        <h2 style={{ marginBottom: "19px", textAlign: 'center' }} >
                            Create<span style={{ color: '#1e57a4' }}>Book</span>
                        </h2>

                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                            <div className="col-md-4 position-relative">
                                <label htmlFor="validationTooltip01" className="form-label">Title</label>
                                <input type="text" className="form-control inpu" name='title' id="validationTooltip01" onChange={handleInputChange} required />
                                <div className="valid-tooltip">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-6 position-relative">
                                <label htmlFor="validationTooltip03" className="form-label">Author</label>
                                <input type="text" className="form-control inpu" name='author' id="validationTooltip03" onChange={handleInputChange} required />
                                <div className="invalid-tooltip">
                                    Please provide a valid author.
                                </div>
                            </div>

                            <div className="col-md-3 position-relative">
                                <label htmlFor="validationTooltip05" className="form-label">Year</label>
                                <input type="text" className="form-control inpu" name='year' id="validationTooltip05" onChange={handleInputChange} required />
                                <div className="invalid-tooltip">
                                    Please provide a valid year.
                                </div>
                            </div>
                            <div class="mb-2">
                                <label for="formFile" class="form-label">Upload Image</label>
                                <input class="form-control" type="file" id="formFile" name='image' accept='image/*' style={{backgroundColor:'transparent',color:'white'}} onChange={handleInputImage} ></input>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
