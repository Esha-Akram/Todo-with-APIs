import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Registor.css';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { API_URL } from '../apiUrl/API_URL';

const Registor = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    function displayLoading() {
        setIsLoading(true);
    }
    function hideLoading() {
        setIsLoading(false);
    }
    function registor() {
        displayLoading();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_URL}/register`, requestOptions)
            .then(response => response.json())
            .then(result => {
                hideLoading()
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'You are successfully registored!',
                        'success'
                    )
                    Navigate("/login");
                } else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                console.log('error', error.message)
                swal(error.message, "Internet Server Down...");
            });
    }
    return (
        <div id='registor'>
            <div className='container'>
                <div className='content'>
                    <div className='side-content'>
                        <h1><span>Welcome Back!s</span></h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <Link to="/login" ><button>Sign In</button></Link>
                    </div>
                    <div className='form-group'>
                        <h1>Create Account</h1>
                        <div className='icons'>
                            <i className='fa fa-facebook'></i>
                            <i className='fa fa-google'></i>
                            <i className='fa fa-linkedin'></i>
                            <p>or registor with your email account</p>
                        </div>
                        <input type='text' id='name' name='name' onChange={event => setName(event.target.value)} placeholder='&#xF007;  Name' />
                        <input type='text' id='email' name='email' onChange={event => setEmail(event.target.value)} placeholder='&#xf0e0;  Email' />
                        <input type='text' id='password' name='password' onChange={event => setPassword(event.target.value)} placeholder='&#xf023;  Password' />
                        <button onClick={registor}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div id="loading-overlay" className={isLoading ? 'active' : ''}>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    )
}

export default Registor;