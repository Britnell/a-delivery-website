
import React from "react";

import { actions, useAppState } from "./appstate";
import { apiGet, apiPost } from "./apicall";

import styles from '../styles/Owner.module.css'
import RestaurantCard from "./restaurantcard";
import RestaurantOrders from "./restorders"


export default function Owner(){
    const [state,dispatch] = useAppState();
    
    const [restaurants,setRestaurants] = React.useState([])

    React.useEffect(()=>{
        apiGet('/api/rest/find',{  ownerId: state.user.id  })
        .then(res=> setRestaurants(res.data) )
    },[])

    const add_rest = ()=>{
      apiPost('/api/rest/create',{
        name: 'New Restaurant',
        description: 'Description',
        ownerId: state.user.id,
      })
      .then(res=> setRestaurants([...restaurants,res.data]) )
    }

    

    const deleterest = (id)=>{
      console.log(' remove list ',id )
      let filt = restaurants.filter(res=> res.id!=id )
      setRestaurants(filt)
    }
    
    return(
      <div>
        <section>
          <div>Welcome {state.user.username} </div>
        </section>

        <RestaurantOrders />

        <section>
          <div>Your restaurants</div>
          
          <div className={styles.grid} >            
              {restaurants.map((rest,i)=> (
                  <div className={styles.card} key={rest.id} >
                      <RestaurantCard 
                        data={rest} editable={true} deleterest={deleterest}
                        clickpage={actions.editrestaurant}
                      />
                  </div>
                  )) }
          </div>
        </section>

        <section>
          
          <div>Add new Restaurant</div>
          <button onClick={add_rest} >Create new</button>
          {/* <div className={styles.card} >
                <RestaurantCard data={{
                  name: 'New Restaurant',
                  description: 'description'
                }} editable={true} />
            </div> */}
        </section>


      </div>
    )

  }
  