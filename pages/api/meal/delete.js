import db from '../../../lib/db'

export default async function handler(req,res) {
    var id = req.query.id
    if(typeof id === 'string')    id = parseInt(id)
    let meals = await db.deleteMeal({ id })
    res.status(200).json({data: true })
}

