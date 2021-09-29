import db from '../../lib/database'

export default function handler(req, res) {
    
    console.log('treq',req.body,req.query)    

    async function main(){
        console.log('------------------test\n' )

        var data;
        // let created = await db.createUser({
        //     username: 'Shay',email: '456',type: 'regular',
        // })
        // console.log({created})

        // let find = await db.findUser({email:'123'})
        // console.log({email:'123'},{find})

        // let allusers = await db.findUser()
        // console.log({allusers})

        // let create = await db.createRestaurant(data)
        // console.log({
        //     name: 'full moon',
        //     description: 'worst place ever\n Really.',
        //     ownerId: 2,
        // })


        let restaurants = await db.findRestaurant();
        console.log({restaurants})

        // let edit = await db.editRestaurant(1,{
        //     name: 'Le Butty',
        //     description:'Fancy french shit.',
        // })
        
        // let food = await db.createMeal({
        //     name: 'spaghetti',
        //     description:'vegan',
        //     price: '11.99',
        //     restaurantId: 2
        // })
        // console.log('created', food )

        
        // let repl = await db.editMeal(2,{
        //     description: 'NOT made of horse',
        // })
        
        // let allmeals = await db.findMeal()
        // console.log({allmeals})

        let meals = await db.restaurantMeals()
        console.log({meals})

        // let firstorder = await db.createOrder({
        //     meals: '3',
        //     date: getDate(),
        //     total: '11.99',
        //     status: 'Placed',
        //     history: JSON.stringify({
        //         placed: getDateTime(),
        //     }),
        //     restaurantId: 2,
        //     userId: 3,
        // })
        // console.log({firstorder})

        // Placed, Canceled, Processing, In Route, Delivered, Received

        let allorders = await db.findOrder()
        console.log({allorders})

    }
    main()

    res.status(200).json({ test: 123 })

  }
  