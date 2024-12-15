import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import '../Login/login.css';
import axios from 'axios';



const Login = () => {
    const errRef = useRef();
    const navigate = useNavigate();
    
    

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/api/users/login", {
                username: user,
                password: pwd
            });
            console.log(response.data)
            setToken(response.data.token);
            setMessage("Login Successful");
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('username', response.data.username); 



            // Navigate based on user role
            if (response.data.role === 'admin') {
                navigate('/admin/dashboard');  // Redirect to admin dashboard
            } else {
                navigate('/home');  // Redirect to user home page
            }

        }catch(error){   
            setMessage(error.response?.data?.message || "login failed")         
        }
        

    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                
                <button type="submit">Sign In</button>
            </form>
            <p>Need an Account?<br />
                <span className="line">
                    <a href="/">Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default Login;
