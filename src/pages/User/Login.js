import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { Login_URL } from '../../components/apiUrl/API_URL';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import useFetch from '../../components/usefetch';
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
        redirect: 'follow'
    };

    const { fetchApi, isLoading } = useFetch(`${Login_URL}/login`, requestOptions);

    function login() {
        fetchApi()
            .then(result => {
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'You are successfully login!',
                        'success'
                    )
                    localStorage.setItem('userToken', result.token);
                    localStorage.setItem('userData', JSON.stringify(result.user));
                    navigate("/view");
                }
                else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                swal(error.message, "Internet Server Down...");
            });
    }

    return (
        <motion.div id='login'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
            <div className='container'>
                <div className='content'>
                    <div className='form-group'>
                        <h1>Login</h1>
                        <div className='icons'>
                            <i className='fa fa-facebook'></i>
                            <i className='fa fa-google'></i>
                            <i className='fa fa-linkedin'></i>
                            <p>or login with your email account</p>
                        </div>
                        <input type='text' id='email' name='email' value={email} onChange={event => setEmail(event.target.value)} placeholder='&#xf0e0;  Email' />
                        <input type='text' id='password' name='password' value={password} onChange={event => setPassword(event.target.value)} placeholder='&#xf023;  Password' />
                        <button type='submit' onClick={login}>Sign In</button>
                    </div>
                    <div className='side-content'>
                        <h1><span>Hello, New Here!e</span></h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Link to="/registor"><button>Sign Up</button></Link>
                    </div>
                </div>
            </div>
            <div id="loading-overlay" className={isLoading ? 'active' : ''}>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </motion.div>

    )
}

export default Login;