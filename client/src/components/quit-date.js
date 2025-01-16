import React , { useState} from 'react';
import { useDispatch , useSelector}  from 'react-redux';
import { setQuitDate } from '../redux/slices/auth-slice';

const QuitDate = () => {
    const dispatch = useDispatch();
    const { loading , error} = useSelector((state) => state.auth);
    const [quitDate, setQuitDateInput] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setQuitDate({quitDate}));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='date' name="quit_date" value={quitDate} onChange={(e) => setQuitDateInput(e.target.value)} disabled={loading} />
                <button type="submit">Set Up</button>
                {error && <p>{error.message}</p>}

            </form>
        </div>
    );
};

export default QuitDate;