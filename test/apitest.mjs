import fetch from 'node-fetch'

async function fetchJson(...args) {
    try {
      const response = await fetch(...args);
      const data = await response.json();
  
      if (response.ok)  return data;
    
      const error = new Error(response.statusText);
      error.response = response;
      error.data = data;
      throw error;
    } 
    catch (error) {
      if (!error.data) {
        error.data = { message: error.message };
      }
      throw error;
    }
  }
  
  function apiPost(uri,data){
    return fetchJson(uri,{
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({data})
    })
  }
  
  function apiGet(uri,params){
    if(params)
      uri += '?' + Object.keys(params).map(key=> `${key}=${encodeURIComponent(params[key])}` ).join('&')
    return fetchJson(uri)
  } 
  

const host = 'http://localhost:3000'

function checkError(res){
    if(res.error)        throw new Error(res.error)
}

function checkEmpty(res){
    if(res.data)
    if(res.data[0])
        throw new Error(' not empty : ', res )
    
    console.log(' Confirmed - api response is empty ')
}

function compareObj(A,B){
    let keyA = Object.keys(A)
    let keyB = Object.keys(B)
    if(keyA.length!==keyB.length)
        throw new Error(' Comparison error : length ',A,B)
    
    for(var k in keyA){
        if(A[k]!==B[k])
            throw new Error(' Comparison error : ', A,B,k )
    }

    console.log(' Comparison was fine ')
}

async function ownerTest(){
    
    console.log(' create rest owner user ')
    let ownerData = {
        username: 'testowner',
        email: Date.now().toString(),
        type: 'owner',
    }

    let owner = await apiPost(host+'/api/user/register', ownerData )
    checkError(owner)
    console.log(' created owner : ' )

    let restData = { 
        ownerId: owner.id,
        name: 'Test Restaurant',
        description:  'test description'
    }
    let rest = await apiPost(host+'/api/rest/create',restData)
    rest = rest.data
    console.log(' Created restaurant : ' )

    let mealData = {
        name: 'testmeal',
        description: '123456789',
        price: '12.23',
        restaurantId: rest.id,
    }
    let meal = await apiPost(host+'/api/meal/create',mealData)
    meal = meal.data
    console.log(' created meal ' )

    // * compare
    var findOwner = await apiGet(host+'/api/user/find',{  id: owner.id })
    compareObj(owner, findOwner.data[0] )

    var findRest = await apiGet(host+'/api/rest/find',{  id: rest.id })
    compareObj(rest, findRest.data[0] )

    var findMeal = await apiGet(host+'/api/meal/find',{  id: meal.id })
    compareObj(meal, findMeal.data[0] )
 
    console.log(' Deleting all again ')
    await apiGet(host+'/api/user/delete',{ id: owner.id })
    await apiGet(host+'/api/rest/delete',{ id: rest.id })
    // delete restaurant deletes meals too

    var empty 
    empty = await apiGet(host+'/api/user/find',{  id: owner.id })
    checkEmpty(empty)
    empty = await apiGet(host+'/api/rest/find',{  id: rest.id })
    checkEmpty(empty)
    empty = await apiGet(host+'/api/meal/find',{  id: meal.id })
    checkEmpty(empty) 

    // ***
}
 
// ownerTest()

async function orderTest(){

    var user = await apiGet(host+'/api/user/find',{ type: 'regular' } )
    user = user.data[0]
    console.log(' first user ', user )

    var rest = await apiGet(host+'/api/rest/find')
    rest = rest.data[0]
    console.log(' first rest ', rest )
    
    var meals = await apiGet(host+'/api/meal/find',{ restaurantId: rest.id })
    meals = meals.data 
    console.log(' meals : ', meals )

    var orderData = {
        meals: meals.map(m=>m.id).join(', '),
        total: '100.0',
        date: new Date().toLocaleDateString(),
        status: 'pending',
        history: '', 
        restaurantId: rest.id,
        userId: user.id,
    }
    var order = await apiPost(host+'/api/order/create',orderData)
    order = order.data
    console.log(' Created order ', order )

    var check = await apiGet(host+'/api/order/find',{ id: order.id })
    check = check.data[0]
    console.log(order,check)
    compareObj(order,check)
    
}   
orderTest()
