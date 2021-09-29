import React from "react"

import { actions, pages, useAppState, statuses } from "./appstate"
import {apiPost} from './apicall'
import styles from '../styles/Order.module.css'

function OrderItem({data}){

    return(
        <div className={styles.item}>
            <div className={styles.name} >{data.name}</div>
            <div className={styles.price} >£ {data.price}</div>
        </div>
    )
}

export default function Order(){

    const [state,dispatch] = useAppState()
    const [error,setError] = React.useState()    
    const {order} = state

    function getDate(){
        return new Date().toLocaleDateString()
    }

    function getDateTime(){
        return new Date().toLocaleString()
    }

    function userIsBlocked(){
        let uid = state.user.id.toString()
        let blocked = state.restaurant.blockedUsers

        if(!blocked)    return false;
        else            return blocked.includes(uid);        
    }

    const place = async ()=>{
        
        // * if blocked, don't order
        const blocked = userIsBlocked()
        if(blocked)     return setError(' Error - you can not order from this restaurant ');

        // * Empty order
        if(state.order.total==0)    return setError(' Error - empty order ')

        // * Place order
        let res = await apiPost('/api/order/create',{
            meals: state.order.list.map(m=>m.name).join(', '),
            total: state.order.total,
            date:  getDate(),
            status: statuses[0],
            history: JSON.stringify({
                placed: getDateTime(),
            }),
            userId: state.user.id,
            restaurantId: state.restaurant.id,
        })

        dispatch({
            type: actions.page,
            page: pages.regular,
        })
    }

    return (
    <div className={styles.container} >
        <div className={styles.title}>Order</div>

        <div> 
            {order.list.map((m,i)=>(
                <OrderItem key={i} data={m} />
            ))}
            <div>
                <div className={styles.total}>
                    <div className={styles.name} >Total</div>
                    <div className={styles.price} >£ {order.total}</div>
                </div>
            </div>
        </div>
        
        <div className={styles.error} >
            {error}
        </div>
        <div>
            <button onClick={place} >Place order</button>
        </div>
    </div>)
}