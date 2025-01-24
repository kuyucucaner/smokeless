import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkProgress } from "../redux/slices/daily-mark-slice";

const CheckProgress = () => {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.dailyMarks);

    useEffect(() => {
      dispatch(checkProgress());
      }, [dispatch]);  // Sadece progress değiştiğinde çalışacak
      
      console.log("Progress Sayfa : " , progress);
  return (
<div>
  <h2>Progress Check</h2>
  <div>
      <strong>Goal Reached:</strong> {progress.isGoalReached ? "Yes 🎉" : "No 🚀"}
      <p>Current Progress: {progress.currentProgress} days</p>
      <p>Target Days: {progress.targetDays} days</p>
    </div>
</div>

  );
  
};

export default CheckProgress;
