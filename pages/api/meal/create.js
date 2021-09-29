import db from '../../../lib/db'

export default async function handler(req, res) {
    // Create
    const data = req.body.data
    
    let edit = await db.createMeal({
        name: data.name,
        description: data.description,
        price: data.price,
        restaurantId: data.restaurantId,
    })
    
    res.status(200).json({data: edit }) 
}

