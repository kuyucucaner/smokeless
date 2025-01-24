import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateMark, getMarks } from "../redux/slices/daily-mark-slice";

const DailyMark = () => {
  const dispatch = useDispatch();
  const { marks, error, loading } = useSelector((state) => state.dailyMarks);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(getMarks());
  },[dispatch]);
  
  const handleMarkDay = () => {
    if (!selectedDate) return;
    dispatch(addOrUpdateMark({ date: selectedDate }));
  }
  return (
    <div>
        <h2> daily mark tracker</h2>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        <button type="submit" onClick={handleMarkDay}> mark day</button>


        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}

        <h4>Mark days : </h4>
        <ul>
            {/* {marks.map((mark, index ) => (
                <li key={index}>
                    {mark.date} - {mark.is_marked ? "Marked" : "Not Marked"};
                </li>
            ))} */}
        </ul>
    </div>
  )
};

export default DailyMark;
