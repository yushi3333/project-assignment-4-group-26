import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../Login/login.css'



const Login = () => {
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Check if the user exists and credentials are valid
        if (storedUser && storedUser.user === user && storedUser.pwd === pwd) {
            navigate('/home'); // Redirect to home page on successful login
        } else {
            setErrMsg("Invalid username or password");
            errRef.current.focus();
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
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
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
