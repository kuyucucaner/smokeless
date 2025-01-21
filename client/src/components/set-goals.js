import React , { useState} from "react";
import { useDispatch , useSelector} from "react-redux";
import { setGoal } from "../redux/slices/daily-mark-slice";

const SetGoal = () => {
    const dispatch = useDispatch();
    const { targetDay , error , loading} = useSelector((state) => state.dailyMarks);
    const [targetGoalDay , setTargetGoalDay] = useState("");

    const handleSetGoal = () => {
        dispatch(setGoal({ targetDays: targetGoalDay }));
        setTargetGoalDay("");
    }

    return (
        <div>
            <h2>set your goal</h2>
        <input type="number" value= {targetGoalDay} onChange={(e) => setTargetGoalDay(e.target.value)} />
        <button type="submit" onClick={handleSetGoal} disabled={loading}>Set Goal</button>
        {error && <p style={{ color: "red" }}>{error.message || error}</p>}
        {targetDay && <p style={{ color: "green" }}>Goal set for {targetDay} days!</p>}

        </div>
    );
};

export default SetGoal;