import { useState } from 'react';
import { Link } from "react-router-dom";
import './Registor.css';

const Registor = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function registor() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": "esha",
            "email": "eshabsoft@gmail.com",
            "password": "12345678"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://complete-todolist.onrender.com/api/v1/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <div id='registor'>
            <div className='container'>
                <div className='content'>
                    <div className='side-content'>
                        <h1><span>Welcome Back!s</span></h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <Link to="/" ><button>Sign In</button></Link>
                    </div>
                    <form className='form-group'>
                        <h1>Create Account</h1>
                        <div className='icons'>
                            <i className='fa fa-facebook'></i>
                            <i className='fa fa-google'></i>
                            <i className='fa fa-linkedin'></i>
                            <p>or registor with your email account</p>
                        </div>
                        <input type='text' id='name' name='name' value={name} onChange={event => setName(event.target.value)} placeholder='&#xF007;  Name' />
                        <input type='text' id='email' name='email' value={email} onChange={event => setEmail(event.target.value)} placeholder='&#xf0e0;  Email' />
                        <input type='text' id='password' name='password' value={password} onChange={event => setPassword(event.target.value)} placeholder='&#xf023;  Password' />
                        <button onClick={registor}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registor;