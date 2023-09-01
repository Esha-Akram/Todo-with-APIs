import { Link } from "react-router-dom";
import './Registor.css';
import { motion } from "framer-motion";
import useCustomeHook from '../traits/apiFunctions';

const Registor = () => {

    const { registor, isLoading, setName, setPassword, setEmail } = useCustomeHook();

    return (
        <motion.div id='registor'
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: -20, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
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
        </motion.div>
    )
}

export default Registor;