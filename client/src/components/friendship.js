import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendship,
  getUserFriendships,
} from "../redux/slices/friendship-slice";

const Friendship = () => {
  const dispatch = useDispatch();
  const { friendships, error, loading } = useSelector(
    (state) => state.friendship
  );
  const [friendId, setFriendId] = useState("");

  useEffect(() => {
    dispatch(getUserFriendships());
  }, [dispatch]);
console.log('friend', friendships);
  const handleAddFriendship = (e) => {
    e.preventDefault();
    if (!friendId) {
      alert("Please enter a friend's ID");
      return;
    }
    dispatch(addFriendship(friendId));
    setFriendId("");
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return <p>Loading friendships...</p>;
  }

  // Show error message if there's an error in fetching friendships
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <form onSubmit={handleAddFriendship}>
        <input
          type="text"
          placeholder="Please enter a friend ID"
          onChange={(e) => setFriendId(e.target.value)}
          value={friendId}
        />
        <button type="submit">Add Friendship</button>
      </form>
      {Array.isArray(friendships) && friendships.length > 0 ? (
    <ul>
        {friendships.map((friendship) => (
            <li key={friendship.friendship_id}>
                Friend ID: {friendship.friend_id}
            </li>
        ))}
    </ul>
) : (
    <p>No friendships found.</p>
)}

    </div>
  );
};

export default Friendship;
