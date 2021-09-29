import db from '../../../lib/db'

export default async function handler(req, res) {
    const data = req.query
    let resp = await db.findOrder(req.query)
    res.status(200).json({data:resp}) 
}

