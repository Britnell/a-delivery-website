import Head from 'next/head'
import Image from 'next/image'
import React, { Children } from 'react'

import styles from '../styles/Home.module.css'

import {apiGet,apiPost} from '../lib/apicall'
import { useAppState, actions, pages } from '../lib/appstate'

import Header from '../lib/header'
import Navigator from '../lib/navigator'

import Login from '../lib/login'
import Register from '../lib/register'

import Regular from '../lib/regular'
import Owner from '../lib/owner'

import Restaurant from '../lib/restaurant'
import RestaurantEdit from '../lib/restaurantedit'


function Welcome(){


  return (
    <div className={styles.welcome}>
      <div className={styles.title}>Welcome</div>
      
      <p>This is the story of the Food Delivery Company</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt varius ex. Sed massa ligula, pellentesque imperdiet leo vitae, blandit efficitur felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras placerat maximus molestie. In hac habitasse platea dictumst. Integer et nunc pharetra, tristique justo vel, euismod neque. Sed erat enim, efficitur id urna nec, vestibulum consequat lectus. Nam lobortis gravida odio. Etiam in sollicitudin justo, nec hendrerit elit. Donec tincidunt efficitur turpis quis feugiat. Nullam non consectetur nisi. Proin non efficitur neque. Curabitur vehicula nisl vulputate odio iaculis porttitor. Quisque vehicula condimentum sapien a porttitor. Praesent tempor consectetur dui sed fermentum. In consequat hendrerit laoreet.</p>
      <p>Donec quis pellentesque leo, eget volutpat nisi. Nam vestibulum, enim porta hendrerit tristique, lorem justo varius mi, ut ullamcorper dui nulla volutpat enim. Nulla et nibh est. Curabitur fermentum dui arcu, nec mollis ex luctus id. Vestibulum sollicitudin sit amet nisi in condimentum. Quisque odio nulla, lacinia varius libero ultricies, condimentum accumsan dui. In vulputate massa vel leo ornare congue. Nulla viverra metus nisl, et imperdiet tortor posuere quis. Maecenas ac felis sem. Suspendisse bibendum commodo ligula, vel lacinia nisl iaculis at. Nunc semper odio sed nibh ultrices sollicitudin. </p>

    </div>
  )
}

export default function Home() {

  const [state,dispatch] = useAppState()
  const {page} = state;

  console.log(' <Home : ',state) 

  // * Fetch session user
  React.useEffect(()=>{
    apiGet('/api/user/get')
    .then(data=>{
      if(data.loggedIn){        
        dispatch({
          type: actions.login,
          user: data.user,
          loggedIn: data.loggedIn
        })
      }
    })

  },[dispatch])

  var main
  switch(page){
    case pages.welcome:
      main = <Welcome />
      break;
    case pages.login:
      main = <Login />
      break;
    case pages.register:
      main = <Register />
      break;
    
      case 'regular':
      main = <Regular />
      break;
    case pages.restaurantpage:
      main = <Restaurant />
      break;
    
    case 'owner':
      main = <Owner />
      break;
    case pages.editrestaurant:
      main = <RestaurantEdit />
      break;
    default:
      main = <div> PAGE : {page} </div>
      break;
  }

  return <div className={styles.page}>
      <Head>
        <title>NEXT food delivery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navigator />

      {main}
      
      <footer></footer>
    </div>
  
}
