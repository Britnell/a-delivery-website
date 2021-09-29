import React from "react";
import login from '../styles/Login.module.css'
import { apiPost } from "./apicall";
import { useAppState,actions } from "./appstate";

function Register(){

    const [state,dispatch] = useAppState()
    const [error,setError] = React.useState()

    function formSubmit(ev){
        ev.preventDefault()

        let data = {
            username: ev.target.elements.name.value,
            email: ev.target.elements.email.value,
            type: ev.target.elements.type.value,
        }

        apiPost('/api/user/register',data)
        .then(res=>{
            if(res.error)    setError(res.error)
            else {
                apiPost('/api/user/login',{
                    username: res.username, 
                    email: res.email,
                })
                .then(data=>{
                    if(data.error){
                        // ERROR
                    }
                    else 
                        dispatch({
                            type: actions.login,
                            user: data.user,
                        })
                })
            }
        })

    }

    return (
        <div>
            <form onSubmit={formSubmit}>
            <div className={login.grid}>

                <div>username</div>
                <div><input name="name" type="text" ></input></div>
                
                <div>email</div>
                <div><input name="email" type="text" ></input></div>

                <div>Account type</div>  
                <div>    
                    <select name="type">
                        <option value="regular">Regular</option>
                        <option value="owner">Restaurant Owner</option>
                    </select>
                </div>

                <div></div>
                <div><input type="submit" value="Submit" /></div>

                <div className={login.error}>{error}</div>

            </div>
            </form>
        </div>
    )
}

export default Register
