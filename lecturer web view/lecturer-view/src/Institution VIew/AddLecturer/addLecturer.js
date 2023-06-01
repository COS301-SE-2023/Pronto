import React from "react";
import InstitutionNavigation from "../InstitutionNavigation";

const AddLecturer = () => {

    return (
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
            <main style={{ width: '900px',marginTop: '30px' }}>
                {/* Input forms content */}
                <h1 className={'text-center'}>Add a lecturer</h1>


                <div className="card shadow">
                    <div className="card-body">
                        <form>

                            <div className="form-row">
                                {/* First name */}
                                <div className="form-group col-6">
                                    <label htmlFor="name">First Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="John" required/>
                                </div>

                                {/* Last name */}
                                <div className="form-group col-6">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Doe"
                                           required/>
                                </div>
                            </div>

                            <div className="form-row">

                                {/* Email */}
                                <div className="form-group col-6">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email"
                                           placeholder="john.doe@up.ac.za" required/>
                                </div>


                                {/* Module Code e.g. COS132*/}
                                <div className="form-group col-6">
                                    <label htmlFor="moduleCode">Module Code</label>
                                    <input type="text" className="form-control" id="moduleCode" placeholder="COS132"
                                           required/>
                                </div>
                            </div>

                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone else.</small>


                            <button type="submit" className="btn btn-primary w-100">Submit</button>

                        </form>
                    </div>
                </div>

                {/* Display content */}
                <h1 className={'text-center'}>Lecturers</h1>
                {/* Search bar with search material ui icon and border radius of 20px*/}
                <div className="input-group mb-3 p-1">
                    <input type="text" className="form-control" placeholder="Search for a lecturer"
                           aria-label="Search for a lecturer" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" id="button-addon2">
                            <i className="material-icons">search</i>
                        </button>
                        {/*a dropdown filter for the search*/}
                        <select className="custom-select" id="inputGroupSelect01">
                            <option selected>Filter by</option>
                            <option value="1">First Name</option>
                            <option value="2">Last Name</option>
                            <option value="3">Email</option>
                            <option value="4">Module Code</option>
                        </select>
                    </div>
                </div>
                <div className="card shadow w-100" style={{'width' : '500px'}}>
                    <div className="card-body">
                        <table className="table table-hover " style={{alignItems: 'center'}}>
                            <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Module Code</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>
                                    <a href="mailto:">
                                        john.doe@up.ac.za
                                    </a>
                                </td>
                                <td>COS132</td>
                                <td>
                                    <button type="button" className="btn btn-danger w-100">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>



            </main>
        </div>
    )
}

export default AddLecturer;