import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
    const history=useHistory();
    return <>
    <h1>Profile</h1>
    <button onClick={()=>{
        history.push("/home")}
        }>Go to Home</button>
    </>
}

export default Profile;