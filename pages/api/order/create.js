import db from '../../../lib/db'

export default async function handler(req, res) {

    const data = req.body.data
    let resp = await db.createOrder({
        meals: data.meals,
        total: data.total.toString(),
        date: data.date,
        status: data.status,
        history: data.history, 
        restaurantId: data.restaurantId,
        userId: data.userId,
    })
    res.status(200).json({data: resp }) 
}

