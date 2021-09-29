import React from "react"

import { useAppState,statuses } from "./appstate"
import { apiGet } from "./apicall"

import styles from "../styles/Ordercard.module.css"

function Order({data}){
    const [order,setOrder] = React.useState(data)
    const { id, date , total, meals, status } = order 
    
    const cancel = ()=>{
        apiGet('/api/order/update',{
            id: id,
            status: statuses[5],
        })
        .then(resp => setOrder(resp.data) )
    }
    const receive = ()=>{
        apiGet('/api/order/update',{
            id: id,
            status: statuses[4],
        })
        .then(resp => setOrder(resp.data) )
    }


    return (
        <div className={styles.card}>
            <div>Order #{id} </div>
            <div>{date}</div>
            <div>£ {total}</div>
            <div className={styles.meals}>{meals}</div>
            <div>{status}</div>
            <div>
                { (status===statuses[0]) && <button onClick={cancel} >Cancel Order</button>}
                { (status===statuses[3]) && <button onClick={receive} >Received</button>}
            </div>
        </div>
    )
}

export default function UserOrders(){
    
    const [state,dispatch] = useAppState()
    const [orders,setOrders] = React.useState([])

    React.useEffect(()=>{

        apiGet('/api/order/user',{
            id: parseInt(state.user.id),
        })
        .then(res=>setOrders(res.data))

    },[state])

    return (
        <div className={styles.main}>
            <div className={styles.header}>Your Orders</div>
            <div className={styles.cards}>
                {orders.map((ord,i)=>(
                    <Order key={i} data={ord} />
                    ) )}
            </div>
        </div>
    )
}