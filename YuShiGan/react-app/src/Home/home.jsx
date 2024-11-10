import {useNavigate} from 'react-router-dom';

const Home = ()=>{
    const navigate = useNavigate();
    const handleLogOut=()=>{
        navigate("/")
    }

    return(
        <section>
            <h1>Welcome Home!</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </section>
    )

}

export default Home;