import React from "react";
import Image from "next/image"

import { apiGet } from "./apicall";
import { useAppState, pages, actions } from "./appstate";

import header from '../styles/Header.module.css'
import food  from '../public/img/food.png'

function Header(){
    const [state,dispatch] = useAppState()

    function nav(to){
        dispatch({ 
            type: 'page',   
            page: to 
        })
    }
    
    function logout(){
        apiGet('/api/user/logout')
        .then(res=>{
            console.log(' logged out ',res)
            dispatch({ type: actions.logout })
        })
    }
    
    var main;

    if(!state.loggedIn){
        main = (<>
            <div>
                <button
                    onClick={()=>nav(pages.login)}
                    >Login
                </button>
            {/* </div><div> */}
                <button
                    onClick={()=>nav(pages.register)}
                    >Register</button>
            </div>
        </>)
    }
    else {
        main = (<>
            <div> 
                <div>
                    <label> Hi {state.user.username}  </label>
                    <button onClick={logout} >Logout</button>
                </div>
            </div>
        </>)
    }
    
    return (
        <header className={header.container} >
            <div  className={header.logo} >
                <Image
                    src={food}  alt={'The Food Logo'}
                    width ={40} 
                    height={40}
                />
            </div>
            <div className={header.title}>The Food Delivery App</div>
            {main}            
        </header>
    )
}

export default Header;