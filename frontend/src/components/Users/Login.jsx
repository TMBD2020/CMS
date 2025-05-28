import React, {Fragment, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/FormHelper";
// import {LoginRequest} from "../../APIRequest/UsersAPIRequest";
import AuthUser from '../../AuthApi/AuthUser';
import logo from "../../assets/images/defaultLogo.png"


const  Login = () => {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () => {
        if (IsEmail(email)) {
            ErrorToast("Invalid Email Address");
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required");
        } else {
            http.post('/login', { email, password })
                .then((res) => {
                    localStorage.setItem('token', res.data.access_token);
                    http.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                    console.log(res.data);
                    // Redirect to dashboard
                    // window.location.href = "/super";
                     // Check the user_type and redirect accordingly
                     const userType = res.data.user_type;  // Assuming user_type is returned in the response
                     switch (userType) {
                        case 'client':
                            window.location.href = "/client";
                            break;
                        case 'member':
                            window.location.href = "/member";
                            break;
                        case 'patner':
                            window.location.href = "/patner";
                            break;
                        case 'emp':
                            window.location.href = "/employee";
                            break;
                        case 'super':
                            window.location.href = "/super";
                            break;
                         case 'angelinvestor':
                             window.location.href = "/angelinvestor";
                             break;
                        default:
                            window.location.href = "/login";  // Default route if user_type is unknown
                            break;
                    }

                })
                .catch((error) => {
                    ErrorToast("Login failed. Please check your credentials.");
                    console.error("Login error", error);
                });
        }
    }
    //     // debugger;
    //     let email = emailRef.value;
    //     let pass = passRef.value;
    //     // debugger;
    //     if (IsEmail(email)) {
    //         ErrorToast("Invalid Email Address")
    //     } else if (IsEmpty(pass)) {
    //         ErrorToast("Password Required")
    //     } else {
    //       let result= await LoginRequest(email, pass)
    //        if(result) {
    //            window.location.href="/"
    //        }
    //     }
    // }

    return (
        <Fragment>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-10 col-sm-6">
                    <img src={logo} className="logo w-4" />

                    </div>
                    {/* <div className="col-lg-2 mt-3 login-header-2 col-sm-6">
                        <a href="javascript:void(0)"><p className=''>Need support?</p></a>
                    </div> */}
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-65  p-3">
                            <div className="card-body">
                            {/* <img src={logo} className="logo w-20" /> */}
                          
                                <h3>CMS</h3>
                                <br/>
                                <input type="email"
                                 className="form-control" 
                                 placeholder="Enter email"
                                 onChange={e=>setEmail(e.target.value)}
                                 id="email" 
                                 required
                                 />
                                {/* <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control" type="email"/> */}
                                <br/>
                                <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" 
                        required
                        />
                                {/* <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control" type="password"/> */}
                                <br/>
                                <button onClick={submitForm} className="btn btn-success w-100 animated ">Next</button>
                                <div className="float-center mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6" to="/Registration">Be a subscriber?</Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6" to="/SendOTP">Forget Password</Link>
                                    </span>
                                </div>
                                <p className='mt-5'>Developed  By <a href="javascript:void(0)">Tech Makers BD</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Login;