import React, { useState } from 'react';
import "../styles/Contact_Form.css"
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Error submitting the form.');
        }
    };

    return (
        <div className='container ' style={{marginLeft:'5em'}}>
        <form onSubmit={handleSubmit} action="#" method="post">
        <h1 style={{marginLeft:'7.5em',color:'white',textAlign:'center'}}>Contact Form</h1>
            <div className="column nea">
                <label for="the-name" style={{textAlign:'start'}}>Your Name</label>
                <input className='rounded' type="text" name="name" id="the-name" value={formData.name}
                    onChange={handleChange}
                    required />

                <label for="the-email">Email Address</label>
                <input className='rounded' type="email" name="email" id="the-email" value={formData.email}
                    onChange={handleChange}
                    required />
            </div>
            <div className="column " style={{marginTop:'0em',marginLeft:'20em'}}>
                <label for="the-message">Message</label>
                <textarea className='rounded' name="message" id="the-message" value={formData.message}
                    onChange={handleChange}
                    required></textarea>
                
                <button className='mt-3 rounded-pill sub' type="submit" >Submit</button>
            </div>  
        </form>
        </div>
    );
};
export default ContactForm;
