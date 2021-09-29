
import React from "react";
import { useAppState, actions } from "./appstate";
import { apiGet } from "./apicall";

import RestaurantCard from "./restaurantcard";
import UserOrders from "./userorders";

import styles from '../styles/Regular.module.css'

export default function Regular(){
    const [state,dispatch] = useAppState();
    
    const [restaurants,setRestaurants] = React.useState([])

    React.useEffect(()=>{

        apiGet('/api/rest/all')
        .then(res=> setRestaurants(res.data) )

        dispatch({ type: actions.clearorder })
    },[])
    

    return(
      <div>

        <section>
          <div>Hi {state.user.username}</div>
        </section>

        <UserOrders />
        
        <div>
          <div>Here are our restaurants</div>
          <div className={styles.grid} >            
              {restaurants.map((rest,i)=> (
                  <div className={styles.card} key={i} >
                      <RestaurantCard data={rest} clickpage={actions.restaurantpage}  />
                  </div>
              ) ) }
          </div>
        </div>
      </div>
    )

  }
  