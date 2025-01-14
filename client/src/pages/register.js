import React, { useState} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { registerUser} from '../redux/slices/auth-slice';

const Register = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth); 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(registerUser({email , password , firstName}));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Set your email adress' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Set your firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="password" placeholder='Set your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loading}>Register</button>
                {error && <p>{error.message}</p>}

            </form>
        </div>
    );
};

export default Register;