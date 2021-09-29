import React from "react";
import login from '../styles/Login.module.css'
import { actions, useAppState } from "./appstate";
import { apiGet, apiPost } from "./apicall";

function Login(){
    
    // TODO Error state

    const [,dispatch] = useAppState()
    const [error,setError] = React.useState()

    function formSubmit(ev){
        ev.preventDefault()

        let data = {
            username: ev.target.elements.name.value,
            email: ev.target.elements.email.value,
        }

        apiPost('/api/user/login',data)
        .then(data=>{
            if(data.error)
                setError(data.error)
            else 
                dispatch({
                    type: actions.login,
                    user: data.user,
                })
            
        })
        
    }

    return (
        <form onSubmit={formSubmit}>
        <div className={login.grid}>
                <div>username</div> 
                <div><input name="name" type="text" ></input></div>
                <div>email</div>  
                <div> <input name="email" type="text" ></input></div>
                <div></div>
                <div> <input type="submit" value="Submit" /> </div>
                <div className={login.error} >{error}</div>
        </div>
        </form>
    )
}

export default Login;