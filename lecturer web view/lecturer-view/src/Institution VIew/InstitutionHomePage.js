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
        <div className="container">
            <InstitutionNavigation/>
            <div className="content">
                <h1 className="lechead">Add Lecture</h1>

                {/* three inputs with three labels for: name, surname, email, Module name with a styles attribute with font 20px*/}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginTop: "20px", marginLeft: "20px" }}>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            type={"text"}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Surname"
                            variant="outlined"
                            value={surname}
                            type={"text"}
                            style={{  marginLeft: "20px" }}
                        />
                    </div>
                    <div className="form-group" style={{ marginTop: "20px", marginLeft: "20px" }}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Module Code"
                            placeholder={"COS301"}
                            variant="outlined"
                            style={{  marginLeft: "20px" }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleChange}>
                        Submit
                    </button>
                </form>


            </div>
        </div>)
}

export default InstitutionHomePage;