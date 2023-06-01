import React, {useState} from "react";
import InstitutionNavigation from "./InstitutionNavigation";
import "./InstitutionHome.css";
import TextField from '@mui/material/TextField';

const InstitutionHomePage = () => {


    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: ''
    });

    const { name, surname, email } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data
        console.log(formData);
    };

    return (
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
        </div>
       )
}

export default InstitutionHomePage;