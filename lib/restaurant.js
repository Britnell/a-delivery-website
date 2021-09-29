import React, {useEffect} from "react"
import { actions, useAppState } from "./appstate"
import { apiGet } from "./apicall"

import MealCard from "./mealcard"
import Order from "./order"

import styles from '../styles/Restaurant.module.css'
import RestaurantCard from "./restaurantcard"


export default function Restaurant(){

    const [state,dispatch] = useAppState()
    const {restaurant,order} = state

    const [meals,setMeals] = React.useState([])
    
    useEffect(()=>{
        apiGet('api/meal/restaurant',{  id: state.restaurant.id  })
        .then(res=> setMeals(res.data))
        .catch(err=> console.log({err}))
    },[state])

    
    return (
        <main>
            
            <RestaurantCard data={restaurant} />
            
            <section className={styles.main} >
            
                <div className={styles.meals} >
                        {meals.map((m,i)=>(
                        <div className={styles.mealcard} key={i} >
                            <MealCard data={m} orderable={true} />
                        </div>) )}
                </div>
                
                <div className={styles.order}>
                    <Order />
                </div>

            </section>

        </main>    
    )
}