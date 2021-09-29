import db from '../../../lib/db'

export default async function handler(req, res) {
    let data = await db.findMeal(req.query)
    res.status(200).json({data})     
}

