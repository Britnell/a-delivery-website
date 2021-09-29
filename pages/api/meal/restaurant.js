import db from '../../../lib/db'

export default async function handler(req, res) {
    
    if(!req.query.id)
        return res.status(200).json({error: ' Need id to query '}) 
    
    let data = await db.restaurantMeals(req.query.id)
    res.status(200).json({data})     
}
