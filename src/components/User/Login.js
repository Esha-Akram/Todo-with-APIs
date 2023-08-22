import { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function login() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": "eshabsoft@gmail.com",
            "password": "12345678"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://complete-todolist.onrender.com/api/v1/login", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <div id='login'>
            <div className='container'>
                <div className='content'>
                    <form className='form-group'>
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
                    </form>
                    <div className='side-content'>
                        <h1><span>Hello, New Here!e</span></h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Link to="/register"><button>Sign Up</button></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;