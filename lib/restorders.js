import React from "react"

import { useAppState,statuses } from "./appstate"
import { apiGet } from "./apicall"

import styles from "../styles/OwnerOrdercard.module.css"

function Order({data}){
    const [order,setOrder] = React.useState(data)
    const { id, date , total, meals, status } = order 

    // Processing
    const i = statuses.indexOf(status)
    const label = [0,1,2].includes(i) && statuses[i+1]    

    const click = (label)=>{
        apiGet('/api/order/update',{
            id: id,
            status: label,
        })
        .then(resp =>setOrder(resp.data) )
    }

    const block = ()=>{
        if (window.confirm('Do you want to permanently Block this user?')) {
            console.log(' Block User', order.userId )
        }
    }
    
    const process = (label)?(<div className={styles.button} >
            Mark as <button onClick={()=>click(label)} >{label}</button>
        </div>):(<div className={styles.button} ></div>)
    
    
    return (
        <div className={styles.card}>
            <div>Order #{id} </div>
            <div>{date}</div>
            <div>£ {total}</div>
            <div className={styles.meals} >{meals}</div>
            <div>{status}</div>
            {process}
            <div><button onClick={block} >Block User</button></div>
        </div>
    )
}

export default function RestOrders(){
    
    const [state,dispatch] = useAppState()
    const [orders,setOrders] = React.useState([])

    React.useEffect(()=>{
        apiGet('/api/order/owner',{
            userId: parseInt(state.user.id),
        })
        .then(res=>setOrders(res.data))
    },[state])

    return (
        <div className={styles.main}>
            <div className={styles.header}>Orders</div>
            <div className={styles.cards}>
                {orders.map((ord,i)=>(
                    <Order key={i} data={ord} />
                    ) )}
            </div>
        </div>
    )
}