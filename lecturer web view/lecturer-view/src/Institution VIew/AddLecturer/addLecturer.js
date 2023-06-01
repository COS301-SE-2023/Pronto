import React from "react";
import InstitutionNavigation from "../InstitutionNavigation";

const AddLecturer = () => {

    return (
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
            <main style={{ width: '100%',marginTop: '30px' }}>
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


            </main>
        </div>
    )
}

export default AddLecturer;