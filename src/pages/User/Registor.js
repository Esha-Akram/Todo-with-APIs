import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import './Registor.css';
import { API_URL } from '../../components/apiUrl/API_URL';
import useFetch from '../../components/usefetch';

const Registor = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        }),
        redirect: 'follow'
    };

    const { fetchApi, isLoading } = useFetch(`${API_URL}/register`, requestOptions);

    const registor = () => {
        fetchApi()
            .then(result => {
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'You are successfully registered!',
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
    };
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
                        <button onClick={() => registor()}>Sign Up</button>
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