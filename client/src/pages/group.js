import React , { useState , useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { createGroup , joinGroup } from '../redux/slices/group-slice';


const Group = () => {
    const dispatch = useDispatch();
    const { groups, error, loading } = useSelector((state) => state.group);
    const [groupName , setGroupName] = useState("");
    const [groupId , setGroupId] = useState("");

    const handleCreateGroup =() => {
        dispatch(createGroup({ group_name:groupName }));
        setGroupName("");
    }

    const handleJoinGroup = () => {
        dispatch(joinGroup({ group_id:groupId }));
        setGroupId("");
    }

    return (
        <div>
            <h2>Group</h2>
            <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            <button onClick={handleCreateGroup}>Create Group</button>


            <input type="text" placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)}/>
            <button onClick={handleJoinGroup}>Join Group</button>
        </div>
    ) 
};

export default Group;