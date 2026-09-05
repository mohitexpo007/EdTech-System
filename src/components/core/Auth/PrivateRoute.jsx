import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token}=useSelector((State)=>State.auth);

    if(token!==null){
        return children;
    }
    else return(
        <div>
            <Navigate to="/login"/>
        </div>
    )


}

export default PrivateRoute
