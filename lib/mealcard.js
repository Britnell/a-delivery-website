import React from "react"

import { useAppState, actions } from "./appstate"

import styles from '../styles/Mealcard.module.css'
import { apiGet, apiPost } from "./apicall"

export default function MealCard({data,editable,orderable,deletemeal}){
    
    const [state,dispatch] = useAppState()
    const [edit,setEdit] = React.useState({ ...data, editing: false })
    const {name,description,price} = edit

    function click(){
        console.log(' EDIT : ', edit )
        // dispatch({type: 'addtoorder', meal: data })
    }

    const icon = edit.editing ? 'x' : 'e'

    const iconClick = ()=>{
        if(editable)
            setEdit({...edit,editing: !edit.editing })
    }

    const remove = ()=>{
        if (window.confirm('Do you want to permanently delete this meal?')) {
            apiGet('/api/meal/delete',{ id: data.id })
            .then(resp => deletemeal(data.id) )
        }
    }

    const update = ()=>{

        apiPost('/api/meal/update',edit)
        .then(res=>setEdit({
                ...edit, ...res.data,
                editing: false,
            })  )
    }

    const addtoorder = ()=>{
        dispatch({ type: actions.addtoorder, meal: data })
    }
    
    // Card
    if(!edit.editing)   //onClick={cardclick} 
    return (
        <div className={styles.container} > 
            {editable && <div className={styles.icon} onClick={iconClick}>{icon}</div>}
            <div className={styles.name}>{name}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.price}>£ {price}</div>
            {editable && <button onClick={remove}>delete</button>}
            {orderable && <button onClick={addtoorder}>add to order</button>}
        </div>)

    // Edit mode
    return (
        <div className={styles.container} >
            {editable && <div className={styles.icon} onClick={iconClick}>{icon}</div>}
            <div className={styles.name}>
                <input type="text" value={name} 
                    onChange={e=>setEdit({...edit,name:e.target.value})}
                />
            </div>
            <div className={styles.description}>
                <input type="text" value={description} 
                    onChange={e=>setEdit({...edit,description:e.target.value})}
                />
            </div>
            <div className={styles.price}>
                <input type="text" value={price} 
                    onChange={e=>setEdit({...edit,price:e.target.value})}
                />
            </div>
            <button onClick={update} >Update</button>
        </div>)
}

// - 