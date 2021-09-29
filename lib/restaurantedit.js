


import React, {useEffect} from "react"
import { useAppState } from "./appstate"
import { apiGet,apiPost } from "./apicall"

import MealCard from "./mealcard"
import RestaurantCard from "./restaurantcard"
import Navigator from "./navigator"

import styles from '../styles/Restaurant.module.css'


export default function RestaurantEdit(){

    const [state,dispatch] = useAppState()
    const [meals,setMeals] = React.useState([])
    
    const rest = state.restaurant
    
    useEffect(()=>{
        apiGet('api/meal/restaurant',{  id: rest.id  })
        .then(res=> setMeals(res.data))
        .catch(err=> console.log({err}))
    },[])

    const add_meal = ()=>{
        apiPost('/api/meal/create',{
            name: 'New Meal',
            description: 'Description',
            price: '0.0',
            restaurantId: rest.id,
        })
        .then(res=> setMeals([...meals,res.data]) )
    }

    const deletemeal = (id)=>{
        setMeals(meals.filter(m=> m.id!=id ))
    }

    return (
        <main>
            {/* <Back /> */}
            <section className={styles.back} >
                Back to List of Restaurants 
            </section>
            
            {/* <Navigator /> */}
            
            <RestaurantCard data={rest} />
            
            <section className={styles.main} >
                {/* <div className={styles.main} > */}
                <div className={styles.meals} >
                    <div>
                        {meals.map((m,i)=>(<MealCard key={m.id} data={m} deletemeal={deletemeal} editable={true} />) )}
                    </div>
                    <div>
                        <button onClick={add_meal} >Add new meal</button>
                    </div> 
                </div>
                
            </section>

        </main>    
    )
}