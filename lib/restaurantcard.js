import React from "react"
import Image from 'next/image'

import editIcon from '../public/img/pen.png'
import backIcon from '../public/img/back.png'

import { useAppState, actions } from "./appstate"
import { apiGet, apiPost } from "./apicall"

import styles from '../styles/Restcard.module.css'

export default function RestaurantCard({data,editable,clickpage,deleterest}){
    
    const [state,dispatch] = useAppState()
    
    const [edit,setEdit] = React.useState({ ...data,editing: false })
    const {name,description,id} = edit

    const icon = (<Image 
        src={(edit.editing)?backIcon:editIcon}
        alt={'Edit icon'}
        width ={16} 
        height={16}
    />)
    
    const iconClick = (ev)=>{
        if(editable){
            if(edit.editing)    // cancel edit
                setEdit({...data,editing: false })
            else    // set edit
                setEdit({...edit,editing: true })
            
        }
    }

    const update = ()=>{
        if(!edit.id)    
            return create();

        apiPost('/api/rest/update',edit)
        .then(res=> setEdit({
                ...edit, ...res.data, 
                editing: false,
            })  )

    }

    const create = ()=>{
        
        apiPost('/api/rest/create',{
            name: edit.name,
            description: edit.description,
            ownerId: state.user.id,
        })
        .then(res=>{
            setEdit({
                ...edit, 
                ...res.data, 
                editing: false,
            })
        })
    }
    
    const remove = ()=>{
        // DELETE DB 
        if (window.confirm('Do you want to permanently delete this restaurant?')) {
            apiGet('/api/rest/delete',{ id })
            .then(()=> deleterest(id) )
        }
        else {  ; }
    }

    const click = (ev)=>{
        // avoid trigger on delete button child element
        if(ev.target.tagName==='BUTTON')
            return;

        if(clickpage) 
            dispatch({  type: clickpage, restaurant: edit,  })
    }
    
    
    if(!edit.editing)
    return (
        <div className={styles.container} >
            {editable && <div className={styles.icon} onClick={iconClick}>{icon}</div>}
            <div onClick={click} >
                <div className={styles.name} >{name}</div>
                <div className={styles.description} >{description}</div>
                {editable && <button onClick={remove}>delete</button>}
            </div>
        </div>)
    
    return(
        <div className={styles.container}  >
            {editable && <div className={styles.icon} onClick={iconClick}>{icon}</div>}
            <div className={styles.name} >
                <input type="text" value={name} 
                    onChange={e=>setEdit({...edit,name:e.target.value})}
                />
            </div>
            <div className={styles.description} >
                <textarea value={description} rows={4}
                    onChange={e=>setEdit({...edit,description:e.target.value})}
                    /> 
            </div>
            <button onClick={update} >Update</button>
        </div>)
    
}

// - 