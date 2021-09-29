import { PrismaClient } from '@prisma/client'

// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
let prisma

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
}
// `stg` or `dev`
else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}

	prisma = global.prisma
}


// function errorResp(error){}

function findUser({email,id,username,type}={}){
	if(typeof id ==='string')	id = parseInt(id)
	
    return prisma.user.findMany({
        where: { email,id,username,type } 
    })
}
  
// type = regular / restaurant
function createUser({username,email,type}){
    return prisma.user.create({data:{username,email,type}})
}

function deleteUser({id}){
    if(typeof id === 'string')    id = parseInt(id)
	return prisma.user.delete({
		where: {id}
	})
}

function createRestaurant({name,description,ownerId,blockedUsers}){
	return prisma.restaurant.create({data: {name,description,ownerId,blockedUsers} })
}

// * search with id or ownerId
function findRestaurant({id,ownerId}={}){
	if(typeof id ==='string')	id = parseInt(id)
	if(typeof ownerId ==='string')	ownerId = parseInt(ownerId)
	return prisma.restaurant.findMany({ where: {id,ownerId} })
}

function deleteRestaurant({id,ownerId}={}){
	if(typeof id ==='string')	id = parseInt(id)
	return prisma.restaurant.delete({ where: {id,ownerId} })
}

function createMeal({name,description,price,restaurantId}){
	return prisma.meal.create({	 data: {name,description,price,restaurantId}  })
}

function findMeal({id,restaurantId}={}){
	if(typeof id ==='string')	id = parseInt(id)
	if(typeof restaurantId ==='string')	restaurantId = parseInt(restaurantId)
	return prisma.meal.findMany({ where: {id,restaurantId} })
}

function deleteMeal({id,restaurantId}={}){
	if(typeof id ==='string')	id = parseInt(id)
	if(typeof restaurantId ==='string')	restaurantId = parseInt(restaurantId)
	return prisma.meal.deleteMany({ where: {id,restaurantId} })
}

async function editMeal(id,{name,description,price}){
	let data = await findMeal({id})
	data = data[0]
	if(!data)
		throw new Error(' Meal not found')
	if(name) data.name = name;
	if(description) data.description = description;
	if(price) data.price = price;
	let repl = await prisma.meal.update({ where: {id}, data })
	return repl;	
}

// block user
async function restaurantBlockUser(id,{userId}){
	if(typeof id ==='string')	id = parseInt(id)
	// Fetch
	let data = await findRestaurant({id})
	data = data[0]
	if(!data)	throw new Error(' Restaurant not found')	
	// Replace
	if(!data.blockedUsers)	data.blockedUsers = `${userId},`
	else 					data.blockedUsers += `${userId},`
	// Update
	return await prisma.restaurant.update({	where: {id}, data })
}

// name, description,ownderId
async function editRestaurant(id,{name, description}){
	if(typeof id ==='string')	id = parseInt(id)
	// Fetch
	let data = await findRestaurant({id})
	data = data[0]
	if(!data)	throw new Error(' Restaurant not found')	
	// Replace
	if(name) data.name = name;
	if(description) data.description = description;
	// Update
	return await prisma.restaurant.update({	where: {id}, data })
}

function restaurantMeals(id){
	if(typeof id ==='string')	id = parseInt(id)
	return findMeal({ restaurantId: id })
}

function findOrder({id,meals,date,status,restaurantId,userId}={}){
	if(typeof id ==='string')	id = parseInt(id)
	if(typeof userId ==='string')	userId = parseInt(userId)
	if(typeof restaurantId ==='string')	restaurantId = parseInt(restaurantId)
	return prisma.mealorder.findMany({
		where: {id,meals,date,status,restaurantId,userId}
	})
}

function createOrder({meals,date,status,total,history,restaurantId,userId}){
	return prisma.mealorder.create({
		data: {meals,date,status,total,history,restaurantId,userId},
	})
}

function updateOrder(id,{meals,date,status,total,history,restaurantId,userId}){
	return prisma.mealorder.update({
		where: { id },
		data: {meals,date,status,total,history,restaurantId,userId},
	})
}




const db = { 
	createUser, findUser, deleteUser,
	createRestaurant, findRestaurant, editRestaurant, deleteRestaurant,
	restaurantBlockUser,
	createMeal, findMeal, editMeal, deleteMeal, 
	restaurantMeals, 
	createOrder, findOrder, updateOrder,
	// errorResp,
};

export default db;

// export default prisma
