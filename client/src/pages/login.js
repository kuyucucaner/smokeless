import React , { useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { loginUser } from '../redux/slices/auth-slice';


const Login = () =>{
 const [email , setEmail] = useState("");
 const [password, setPassword] =  useState("");
 const dispatch = useDispatch();
 const { error , loading } = useSelector((state) => state.auth);

 const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email , password}));
 };
 return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Your email address' value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input type="password" placeholder='Your password' value = {password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>Login</button>
            {error && <p>{error.message}</p>}

        </form>
    </div>
 );

};

export default Login;