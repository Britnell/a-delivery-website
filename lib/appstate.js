import React from "react"

export const actions = {
    page:'page',
    login:'login',
    logout:'logout',
    restaurantpage: 'restaurantpage',
    editrestaurant: 'editrestaurant',
    regular: 'regular',
    owner: 'owner',
    addtoorder: 'addtoorder',
    clearorder: 'clearorder',
}

export const pages = {
  welcome: 'welcome ',
  login: 'login',
  register: 'reg',
  user: 'user',
  restaurant: 'restaurant',
  regular: 'regular',
  restaurantpage: 'restaurantpage',
  editrestaurant: 'editrestaurant',
  orderconfirmation: 'orderconfirmation',
}

export const statuses = [
    'Placed',
    'Processing',
    'In Route',
    'Delivered',
    'Received',
    'Canceled'
]

const initialState = {
    loggedIn: false,  
    page: pages.welcome, 
    user: null,
    order: {
        list: [], total: 0,
    },
}

function appReducer(state,action){
    console.log('\t reducer > ', action )
  
    switch(action.type){
        case actions.login:
            return {
                ...state, 
                user: action.user,
                loggedIn: true,
                page: action.user.type,
            }
        case actions.page:
            return {...state, page: action.page }
        case actions.logout:
            return {
                ...state, 
                loggedIn: false,
                user: null,
                page: pages.welcome,
            }
        case actions.restaurantpage:
            return {
                ...state,
                page: pages.restaurantpage,
                restaurant: action.restaurant, 
            }
        case actions.editrestaurant:
            return {
                ...state,
                page: pages.editrestaurant,
                restaurant: action.restaurant, 
            }
        case actions.addtoorder:
            let total = state.order.total + parseFloat(action.meal.price)
            total = Math.round(total*100)/100
            return {
                ...state,
                order: {
                    total: total,
                    list: [...state.order.list,action.meal],
                }
            }
        case actions.clearorder:
            return {
                ...state,
                order: {
                    total: 0, list: [],
                }
            }
        default:
            return {...state,...action}
    }
}

const AppContext = React.createContext();
AppContext.displayName = 'AppContext'

export const useAppState = ()=>{
    return React.useContext(AppContext);
}

export const AppProvider = ({children})=>{
    const [state,dispatch] = React.useReducer(appReducer,initialState)

    const value = [state,dispatch]
    return(
        <AppContext.Provider value={value} >{children}</AppContext.Provider>
    )
}

//     return {state,dispatch};
//   }