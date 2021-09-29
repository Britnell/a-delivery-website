
import React from "react";

import { useAppState, pages, actions } from "./appstate";

import styles from "../styles/Navigator.module.css"

export default function Navigator(){

    const [state,dispatch] = useAppState();

    var path = 'Home'
    if([pages.restaurantpage,pages.editrestaurant].includes(state.page)){
        path += ' / ' + state.restaurant.name
    }
    const showBack = (path.length>4)

    const back = ()=>{
        dispatch({
            type: actions.page,
            page: state.user.type,
        })
    }

    return (<>
    <nav className={styles.container} >
            <div className={styles.addr}>
                {path}
                {/* {path.map((x,i)=>(
                    <div key={i} >{x}</div>
                ))} */}
            </div>
            {showBack && <div onClick={back} className={styles.back}>back</div>}
        </nav>
    </>)

}