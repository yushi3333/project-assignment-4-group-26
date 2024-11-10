import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from 'react-router-dom';
import '../Register/register.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%]).{8,24}$/;
const REGISTER_URL = '/register' //endpoint API
const Register = () =>{
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        //if button enabled with js hack
        const userSubmit = USER_REGEX.test(user)
        const pwdSubmit = PWD_REGEX.test(pwd)
        if (!userSubmit || ! pwdSubmit){
            setErrMsg("Invalid Entry");
            return;//do not submit any thing just return

        }
        if (pwd !== matchPwd){
            setErrMsg("passwords does not match");
            return;

        }
       

        //user data in local storage
        const userData = {user, pwd};
        localStorage.setItem("user", JSON.stringify(userData));
        setSuccess(true);
        setTimeout(()=>{
            navigate("/login"); //redirect to login page
        },2);
        
        
        /*
        try{
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({user, pwd}),{
                headers: 
                    {'Content-Type': 'application/json'},
                    withCredentials: true

            });
            console.log(response.data);
            console.log(response.accessToken)
            console.log(JSON.stringify(response))
            setSuccess(true);


    
        }catch(err){
            if (!err?.response){
                setErrMsg("No server response")
            }else if (err.response?.status == 409){
                setErrMsg("Username Taken")
            }else{
                setErrMsg("Registration failed")
            }
            errRef.current.focus();
        }
        */
    }

    return (
        /*
        success ? (
            <section>
            <h1>Success</h1>
            <p><a href="#">Sign in </a></p>
            </section>
            
    
        ) : (
            */
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:

                </label>
                <input
                    type = "text"
                    id = "username" // match the htmlfor=username
                    ref={userRef} //allow us to set focus on the input
                    autoComplete="off" //
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false":'true'}
                    aria-describedby="invalidName" 
                    onFocus = {()=>setUserFocus(true)}
                    onBlur ={()=>setUserFocus (false)}
                />
                
                <p id="invalidName" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    </span>
                    <span className ={validPwd || !pwd ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />

                    </span>

                    
                    
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="invalidPwd"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="invalidPwd" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    
                    <a href="/login">Log In</a>
                </span>
            </p>




        </section>

       // )

    )
}

export default Register;
