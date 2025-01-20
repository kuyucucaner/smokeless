import React, { useState } from "react";
import { useDispatch , useSelector} from 'react-redux';
import { calculateStats } from '../redux/slices/daily-mark-slice';

const Stats = () => {
    const dispatch = useDispatch();
    const { stats, error , loading } = useSelector((state) => state.dailyMarks);
    const [ cigarettesPerDay , setCigarettesPerDay] = useState("");

// Frontend tarafında, cigarettesPerDay doğrudan sayı olarak gönderilmelidir
const handleCalculate = () => {
    if (!cigarettesPerDay) {
        return alert("please enter cigarettes per day");
    }

    dispatch(calculateStats({ cigarettesPerDay: parseInt(cigarettesPerDay) }));
};

    

    return (
        <div>
            <h2>Smkoing Stats </h2>
            <input type="number" value={cigarettesPerDay} onChange={(e) => setCigarettesPerDay(e.target.value)}  />
            <button onClick={handleCalculate} disabled={loading}>
                {loading ? "Calculating..." : "Calculate Stats"}
            </button>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            { stats && (
        <div>
            <h3>stats : </h3>
            <p> non smoking days : {stats.nonSmokingDays} </p>
            <p>saved money : {stats.savedMoney}</p>
            <h4>health benefits : </h4>
            <ul>
                <li>lung capacity improvment : {stats.healthBenefits.improvedLungCapacity} </li>
                <li>hearth attack risk : {stats.healthBenefits.reducedHeartAttackRisk} </li>
                <li>{stats.healthBenefits.otherHealthRisks}</li>

            </ul>
        </div>                
            )}
            
                    </div>
    );

 };

export default Stats;