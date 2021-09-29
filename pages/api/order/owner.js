import db from '../../../lib/db'

export default async function handler(req, res) {
    console.log(' orders for uid ', req.query.userId )

    let rests = await db.findRestaurant({
        ownerId: req.query.userId,
    })
    
    var orders = []
    for(const res of rests){
        let ord = await db.findOrder({  restaurantId: res.id  })
        orders = orders.concat(ord)
    }
    res.status(200).json({ data: orders }) 
}

